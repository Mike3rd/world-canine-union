// app/admin/emails/api/reply/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "../../../../src/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      to,
      subject,
      message,
      support_email_id,
      wcu_number,
      isNewEmail = false,
      category = "support",
    } = body;

    // ============================================
    // 1. Send email via Resend
    // ============================================
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "World Canine Union <mike@worldcanineunion.org>",
      to: [to],
      subject: subject,
      html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #36454F;">

      <p>${message.replace(/\n/g, "<br>")}</p>
      <br>
      <div style="font-size: 12px; color: #78909C; line-height: 1.4; margin-top: 20px;">
  <p><strong>Mike at World Canine Union</strong><br>
  Email: <a href="mailto:mike@worldcanineunion.org" style="color: #992400;">
    mike@worldcanineunion.org
  </a><br>
  Website: <a href="https://worldcanineunion.org" style="color: #992400;">
    worldcanineunion.org
  </a></p>
  <p style="margin-top: 8px;"><em>Global Registry for all other Dogs</em></p>
</div>
    </div>
  `,
      // Plain text fallback (IMPORTANT for deliverability)
      text: `${message}\n\n--\nMike at World Canine Union\nmike@worldcanineunion.org\nhttps://worldcanineunion.org\nGlobal Registry for all other Dogs`,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error(emailError.message);
    }

    // ============================================
    // 2. BRANCH: NEW EMAIL VS REPLY
    // ============================================
    if (isNewEmail && !support_email_id) {
      // 🆕 NEW EMAIL FLOW (Compose new email)
      console.log("Creating new email thread for category:", category);

      // Determine email_type based on category
      const emailType =
        category === "support" ? "support_ticket" : "outreach_email";
      const sourceValue =
        category === "support" ? "support_outbound" : "outreach";

      // Insert new thread into support_emails
      const { data: newThread, error: threadError } = await supabase
        .from("support_emails")
        .insert([
          {
            original_message_id: emailData.id,
            from_email: "mike@worldcanineunion.org",
            from_name: "Mike at WCU",
            to_email: to,
            subject: subject,
            message_text: message,
            wcu_number: wcu_number,
            status: "sent",
            received_at: new Date().toISOString(),
            source: sourceValue, // support_outbound OR outreach
          },
        ])
        .select("id")
        .single();

      if (threadError) {
        console.error("New thread insert error:", threadError);
        throw threadError;
      }

      // Log to email_logs with the new thread ID
      const { error: logError } = await supabase.from("email_logs").insert({
        email_type: emailType, // support_ticket OR outreach_email
        to_email: to,
        from_email: "mike@worldcanineunion.org",
        subject: subject,
        message_text: message,
        resend_message_id: emailData.id,
        wcu_number: wcu_number,
        support_email_id: newThread.id, // Link to the new thread
        current_status: "sent",
        sent_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      });

      if (logError) {
        console.error("Email log error (new thread):", logError);
      }

      console.log("New email thread created:", newThread.id);

      return NextResponse.json({
        success: true,
        messageId: emailData.id,
        message: "New email sent and logged",
        threadId: newThread.id,
        category: category,
      });
    } else {
      // ↩️ REPLY FLOW (Existing email thread)

      // A. Log to email_logs table
      const { error: logError } = await supabase.from("email_logs").insert({
        email_type: "support_reply",
        to_email: to,
        from_email: "mike@worldcanineunion.org",
        subject: subject,
        message_text: message,
        resend_message_id: emailData.id,
        wcu_number: wcu_number,
        support_email_id: support_email_id,
        current_status: "sent",
        sent_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      });

      if (logError) {
        console.error("Supabase log error:", logError);
        // Don't throw - email was sent successfully
      }

      // B. Update support email status
      const { error: statusError } = await supabase
        .from("support_emails")
        .update({ status: "replied" })
        .eq("id", support_email_id);

      if (statusError) {
        console.error("Status update error:", statusError);
      }

      return NextResponse.json({
        success: true,
        messageId: emailData.id,
        message: "Reply sent and logged",
      });
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
