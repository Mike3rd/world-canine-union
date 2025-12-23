import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper function (same as before)
function extractName(from: string): string {
  if (!from) return "Unknown";
  const nameMatch = from.match(/^([^<]+)</);
  return nameMatch ? nameMatch[1].trim() : from;
}

function extractWcuNumber(subject: string, body: string): string | null {
  const wcuRegex = /WCU-\d{5}/i;
  const subjectMatch = subject?.match(wcuRegex);
  const bodyMatch = body?.match(wcuRegex);
  return subjectMatch?.[0] || bodyMatch?.[0] || null;
}

export async function POST(request: NextRequest) {
  console.log("📨 [STAGE 1] Webhook started");

  try {
    const body = await request.json();
    const eventType = body.type;

    // STAGE 1: ONLY handle email.received
    if (eventType === "email.received") {
      const emailId = body.data?.email_id;
      console.log("📧 Processing email.received for ID:", emailId);

      if (!emailId) {
        throw new Error("No email_id in webhook");
      }

      // 1. Fetch the full email content (PROVEN WORKING)
      const { data: fullEmail, error: fetchError } =
        await resend.emails.receiving.get(emailId);

      if (fetchError) {
        console.error("❌ Failed to fetch email body:", fetchError);
        throw fetchError;
      }

      console.log(
        "✅ Email body fetched. Text length:",
        fullEmail.text?.length
      );

      // 2. Prepare data for database
      const emailData = {
        original_message_id: emailId,
        from_email: body.data?.from || "",
        from_name: extractName(body.data?.from || ""),
        subject: body.data?.subject || "(no subject)",
        message_text: fullEmail.text || "", // ✅ NOW HAS CONTENT
        message_html: fullEmail.html || "", // ✅ NOW HAS CONTENT
        received_at: new Date().toISOString(),
        wcu_number: extractWcuNumber(
          body.data?.subject || "",
          fullEmail.text || ""
        ),
        status: "unread",
        raw_payload: body,
      };

      // 3. Save to support_emails table
      const { error: dbError } = await supabase
        .from("support_emails")
        .insert([emailData]);

      if (dbError) {
        console.error("❌ Database insert failed:", dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log("💾 Successfully saved to support_emails table");
      return NextResponse.json({
        success: true,
        stage: 1,
        saved: true,
        hasBody: !!fullEmail.text,
      });
    }

    // For now, ignore other event types
    console.log(`⚠️ Ignoring event type: ${eventType}`);
    return NextResponse.json({
      success: true,
      stage: 1,
      note: `Ignored event: ${eventType}`,
    });
  } catch (error) {
    console.error("💥 [STAGE 1] Webhook failed:", error);
    return NextResponse.json(
      {
        error: "Stage 1 processing failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
