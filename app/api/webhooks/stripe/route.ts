import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

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

  console.log("🔗 Linking:", {
    registrationId,
    customerId,
    sessionId: session.id,
    paymentIntentId,
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
        amount_paid: 25.0,
        payment_date: new Date().toISOString(),
        status: "completed",
      })
      .eq("id", registrationId);

    if (updateError) {
      console.error("❌ Database update failed:", updateError);
      return;
    }

    console.log("✅ Registration updated to paid:", registrationId);
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
    await generateCertificate(registration);

    // 4. Send welcome email
    await sendWelcomeEmail(registration);

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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/generate-certificate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registration_number: registration.registration_number,
      }),
    });

    if (!response.ok) {
      console.error("❌ PDF generation failed:", response.statusText);
      return;
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
      return;
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
  } catch (error) {
    console.error("❌ Certificate generation error:", error);
  }
}

async function sendWelcomeEmail(registration: any) {
  try {
    console.log("📧 Sending welcome email to:", registration.owner_email);

    // TODO: Implement email sending with Resend
    // For now, log that we would send an email
    console.log("📨 Email would be sent to:", {
      to: registration.owner_email,
      subject: `Welcome to World Canine Union! Your Registration: ${registration.registration_number}`,
      body: `Thank you for registering ${registration.dog_name}!`,
    });

    // Update email sent timestamp
    await supabase
      .from("registrations")
      .update({
        certificate_sent_at: new Date().toISOString(),
      })
      .eq("id", registration.id);

    console.log("✅ Email sent (simulated)");
  } catch (error) {
    console.error("❌ Email sending error:", error);
  }
}
