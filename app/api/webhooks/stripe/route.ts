// This will handle payment success and generate PDF

/*
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function POST(request: Request) {
  // Webhook to handle payment success
  // Will update DB status to 'paid' and generate PDF

 const sig = request.headers.get("stripe-signature");
  const body = await request.text();
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const registrationId = session.client_reference_id;




  // ===== PDF GENERATION WITH DEBUGGING =====
    console.log("📄 Starting PDF generation for:", registrationNumber);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      console.log("📞 Calling API:", `${baseUrl}/api/generate-certificate`);

      const response = await fetch(`${baseUrl}/api/generate-certificate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registration_number: registrationNumber,
        }),
      });

      console.log(
        "📊 API Response Status:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ PDF API Error:", errorText);
        // STILL CONTINUE - don't throw, just log
      } else {
        const pdfBlob = await response.blob();
        console.log("✅ PDF Blob Size:", pdfBlob.size, "bytes");

        // Convert to base64
        const pdfBuffer = await pdfBlob.arrayBuffer();
        const pdfBytes = new Uint8Array(pdfBuffer);
        const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
        console.log("📊 Base64 Length:", pdfBase64.length, "chars");

        // Try to store in Supabase Storage
        let pdfUrl = "";
        try {
          const fileName = `certificates/${registrationNumber}.pdf`;
          console.log("💾 Attempting storage upload...");

          const { error: uploadError } = await supabase.storage
            .from("wcu-dogs")
            .upload(fileName, pdfBlob, {
              contentType: "application/pdf",
              upsert: true,
            });

          if (uploadError) {
            console.warn("⚠️ Storage upload failed:", uploadError.message);
          } else {
            const { data: urlData } = supabase.storage
              .from("wcu-dogs")
              .getPublicUrl(fileName);
            pdfUrl = urlData.publicUrl;
            console.log("✅ PDF stored at:", pdfUrl);
          }
        } catch (storageError) {
          console.warn("⚠️ Storage error:", storageError);
        }

        // Save to database
        console.log("💾 Saving to database...");
        const { error: pdfUpdateError } = await supabase
          .from("registrations")
          .update({
            pdf_url: pdfUrl || null,
            pdf_certificate: pdfBase64,
            certificate_generated_at: new Date().toISOString(),
          })
          .eq("id", registration.id);

        if (pdfUpdateError) {
          console.error("❌ Database update failed:", pdfUpdateError);
        } else {
          console.log("✅ PDF saved to database successfully!");
        }
      }
    } catch (error) {
      console.error("💥 PDF generation crashed:", error);
    }
}
*/
