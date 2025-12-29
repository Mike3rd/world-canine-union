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

      // ⭐⭐⭐ ADD RECIPIENT CHECK ⭐⭐⭐
      const toEmail = body.data?.to || "";
      console.log("📧 Email sent to:", toEmail);

      // Only process emails sent to our addresses
      if (!toEmail.includes("mike@worldcanineunion.org")) {
        console.log("❌ Skipping - not sent to mike@");
        return NextResponse.json({
          success: true,
          skipped: true,
          reason: "Not sent to mike@",
        });
      }
      // ⭐⭐⭐ END RECIPIENT CHECK ⭐⭐⭐

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
    if (
      eventType === "email.sent" ||
      eventType === "email.delivered" ||
      eventType === "email.bounced" ||
      eventType === "email.opened"
    ) {
      console.log(`📤 Processing ${eventType} event`);
      return await handleOutgoingStatus(eventType, body);
    }

    // If we get here, it's an unhandled event type
    console.log(`ℹ️ Unhandled event type: ${eventType}`);
    return NextResponse.json({
      success: true,
      note: `Unhandled event: ${eventType}`,
    });
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

  // New helper function to update email_logs
  async function handleOutgoingStatus(eventType: string, body: any) {
    const emailId = body.data?.email_id;

    if (!emailId) {
      console.warn("⚠️ No messageId found in ANY field");
      // Don't return error - just log and return success to Resend
      return NextResponse.json({
        success: true,
        warning: "No messageId found",
      });
    }
    console.log(
      `Updating email_logs for email: ${emailId}, event: ${eventType}`
    );
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    // Map the webhook event to database fields
    if (eventType === "email.sent") {
      updateData.sent_at = new Date().toISOString();
      updateData.current_status = "sent";
    } else if (eventType === "email.delivered") {
      updateData.delivered_at = new Date().toISOString();
      updateData.current_status = "delivered";
    } else if (eventType === "email.bounced") {
      updateData.bounced_at = new Date().toISOString();
      updateData.bounced_reason = body.data?.bounce?.type;
      updateData.current_status = "bounced";
    } else if (eventType === "email.opened") {
      updateData.opened_at = new Date().toISOString();
      updateData.current_status = "opened";
    }

    const { error } = await supabase
      .from("email_logs")
      .update(updateData)
      .eq("resend_message_id", emailId); // CRITICAL: matches the ID saved when sending

    if (error) {
      console.error(`❌ Failed to update email_logs for ${eventType}:`, error);
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      );
    }

    console.log(`✅ email_logs updated for ${eventType}`);
    return NextResponse.json({ success: true, updated: true });
  }
}
