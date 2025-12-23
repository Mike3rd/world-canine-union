import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  console.log("🔍 [BASIC TEST] Webhook received");

  try {
    // 1. Log the raw request
    const rawBody = await request.text();
    console.log("📦 Raw request body:", rawBody);

    const body = JSON.parse(rawBody);
    console.log("✅ Parsed JSON body type:", body.type);

    // 2. Only process email.received events
    if (body.type === "email.received") {
      const emailId = body.data?.email_id;
      const fromEmail = body.data?.from;

      console.log("📧 Event details:", {
        email_id: emailId,
        from: fromEmail,
        subject: body.data?.subject,
        allDataKeys: Object.keys(body.data || {}),
      });

      // 3. CRITICAL: Try the API call that was 404'ing
      if (emailId) {
        console.log(`🔄 Attempting API fetch for: ${emailId}`);

        // Try the documented endpoint
        const { data: fullEmail, error } =
          await resend.emails.receiving.get(emailId);

        if (error) {
          console.error("❌ API Error Details:", {
            message: error.message,
            name: error.name,
            statusCode: "404",
          });

          // Try the alternative endpoint format
          console.log("🔄 Trying alternative endpoint...");
          try {
            const altResponse = await fetch(
              `https://api.resend.com/emails/${emailId}`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(`📡 Alt Response Status: ${altResponse.status}`);
            const altText = await altResponse.text();
            console.log("📡 Alt Response Body:", altText);
          } catch (altError) {
            console.error("❌ Alt endpoint failed:", altError);
          }
        } else {
          console.log("✅ API SUCCESS! Email body retrieved:");
          console.log("Text preview:", fullEmail.text?.substring(0, 200));
          console.log("HTML preview:", fullEmail.html?.substring(0, 200));
        }
      } else {
        console.warn("⚠️ No email_id found in webhook");
      }
    } else {
      console.log(`⚠️ Ignoring event type: ${body.type}`);
    }

    // Always return 200 to Resend
    return NextResponse.json({
      received: true,
      test: "basic",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("💥 Top-level error:", error);
    return NextResponse.json(
      {
        error: "Processing failed",
        details: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
