import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers(); // ✅ AWAIT the headers
    const signature = headersList.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      case "customer.created":
        await handleCustomerCreated(event.data.object as Stripe.Customer);
        break;
      default:
        console.log(`🔔 Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log("💰 Payment succeeded for session:", session.id);

  // 🔗 CRITICAL LINKING DATA:
  const registrationId = session.metadata?.registration_id;
  // Try multiple ways to get customer ID
  const customerId =
    session.customer || (session as any).customer_details?.email || null;

  console.log("👤 Customer ID attempt:", {
    sessionCustomer: session.customer,
    customerDetails: (session as any).customer_details,
    finalCustomerId: customerId,
  });
  const paymentIntentId = session.payment_intent as string;

  if (!registrationId) {
    console.error("❌ No registration_id in session metadata");
    return;
  }

  // 🔄 NEW: Safely fetch the dynamic payment amount from Stripe
  let finalAmountPaid = 25.0; // Keep hardcoded value as default/fallback
  try {
    if (paymentIntentId) {
      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);
      // Stripe stores amounts in cents. Convert to dollars.
      finalAmountPaid = paymentIntent.amount_received / 100;
      console.log(`✅ Dynamic amount fetched from Stripe: $${finalAmountPaid}`);
    } else {
      console.warn("⚠️ No payment_intent found, using default amount ($25.0).");
    }
  } catch (stripeError) {
    // If ANYTHING goes wrong with Stripe, we log it but continue with the fallback.
    console.error(
      "⚠️ Failed to fetch payment amount from Stripe, using default ($25.0). Error:",
      stripeError
    );
  }

  console.log("🔗 Linking:", {
    registrationId,
    customerId,
    sessionId: session.id,
    paymentIntentId,
    finalAmountPaid, // 🔄 NEW: Log the amount we will save
  });

  try {
    // 1. Update registration with ALL payment info including customer ID
    const { error: updateError } = await supabase
      .from("registrations")
      .update({
        payment_status: "paid",
        stripe_payment_id: paymentIntentId,
        stripe_customer_id: customerId, // ← SAVE CUSTOMER ID
        stripe_checkout_session_id: session.id,
        amount_paid: finalAmountPaid,
        payment_date: new Date().toISOString(),
        status: "completed",
      })
      .eq("id", registrationId);

    if (updateError) {
      console.error("❌ Database update failed:", updateError);
      return;
    }

    console.log(
      `✅ Registration updated to paid ($${finalAmountPaid}):`,
      registrationId
    );
    console.log("👤 Customer linked:", customerId);

    // 2. Get registration details
    const { data: registration, error: fetchError } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (fetchError || !registration) {
      console.error("❌ Registration not found:", registrationId);
      return;
    }

    // 3. Generate PDF certificate
    const pdfUrl = await generateCertificate(registration);

    if (pdfUrl) {
      // 4. Send welcome email
      await sendRegistrationEmail(registration, pdfUrl);
    } else {
      console.error("❌ Could not generate PDF, skipping email");
    }

    console.log(
      "🎉 Registration fully completed:",
      registration.registration_number
    );
  } catch (error) {
    console.error("❌ Error processing payment:", error);
  }
}

async function handleCustomerCreated(customer: Stripe.Customer) {
  // Optional: Log when Stripe creates a customer
  console.log("👤 Stripe customer created:", {
    id: customer.id,
    email: customer.email,
    name: customer.name,
    metadata: customer.metadata, // Contains our registration_id if we added it
  });
}

async function generateCertificate(registration: any) {
  try {
    console.log("📄 Generating PDF for:", registration.registration_number);

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://worldcanineunion.org";
    const response = await fetch(`${baseUrl}/api/generate-certificate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registration_number: registration.registration_number,
      }),
    });

    if (!response.ok) {
      console.error("❌ PDF generation failed:", response.statusText);
      return null; // ← CHANGE: return null instead of just return
    }

    const pdfBlob = await response.blob();

    // Store in Supabase Storage
    const fileName = `certificates/${registration.registration_number}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from("wcu-dogs")
      .upload(fileName, pdfBlob, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.warn("⚠️ PDF storage failed:", uploadError.message);
      return null; // ← CHANGE: return null
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("wcu-dogs")
      .getPublicUrl(fileName);

    // Update registration with PDF URL
    await supabase
      .from("registrations")
      .update({
        pdf_url: urlData.publicUrl,
        certificate_generated_at: new Date().toISOString(),
      })
      .eq("id", registration.id);

    console.log("✅ PDF generated and stored:", urlData.publicUrl);
    return urlData.publicUrl; // ← ADD THIS LINE: return the URL
  } catch (error) {
    console.error("❌ Certificate generation error:", error);
    return null; // ← CHANGE: return null
  }
}

// Line 179: Change function name
async function sendRegistrationEmail(registration: any, pdfUrl: string) {
  // ← ADD pdfUrl PARAMETER HERE
  try {
    console.log("📧 Sending welcome email to:", registration.owner_email);

    // Call the real email function from lib/email
    const emailResult = await sendWelcomeEmail({
      to: registration.owner_email,
      dogName: registration.dog_name,
      ownerName: registration.owner_name,
      wcuNumber: registration.registration_number,
      pdfUrl: `https://worldcanineunion.org/api/certificates/${registration.registration_number}`, // ← Use proxy URL
    });

    if (emailResult.success) {
      console.log("✅ Email sent successfully!");

      // Update email sent timestamp
      await supabase
        .from("registrations")
        .update({
          certificate_sent_at: new Date().toISOString(),
        })
        .eq("id", registration.id);
    } else {
      console.error("❌ Email failed:", emailResult.error);
    }
  } catch (error) {
    console.error("❌ Email sending error:", error);
  }
}
