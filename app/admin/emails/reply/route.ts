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
    } = body;

    // ============================================
    // NEW: VALIDATE REQUIRED FIELDS
    // ============================================
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, message" },
        { status: 400 }
      );
    }

    // ============================================
    // NEW: CHOOSE FROM ADDRESS BASED ON FLOW
    // ============================================
    const fromAddress = isNewEmail
      ? "Mike at WCU <mike@worldcanineunion.org>" // NEW EMAILS
      : "World Canine Union <help@worldcanineunion.org>"; // REPLIES (UNCHANGED)

    const replyToAddress = isNewEmail ? "help@worldcanineunion.org" : undefined;

    // ============================================
    // 1. Send email via Resend (MODIFIED FROM ADDRESS)
    // ============================================
    const emailPayload: any = {
      from: fromAddress,
      to: [to],
      subject: subject,
      html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #36454F;">

  <p>${message.replace(/\n/g, "<br>")}</p>
  <br>
  <div style="font-size: 12px; color: #78909C; line-height: 1.4;">
    <p><strong>World Canine Union Support</strong><br>
    Email: <a href="mailto:help@worldcanineunion.org" style="color: #992400;">help@worldcanineunion.org</a></p>
    <p style="margin-top: 8px;"><em>Global Registry for all other Dogs</em></p>
  </div>
</div>
`,
      text: `${message}\n\n--\nWorld Canine Union Support\nhelp@worldcanineunion.org\nGlobal Canine Registry & memorialization`,
    };

    if (replyToAddress) {
      emailPayload.reply_to = replyToAddress;
    }

    const { data: emailData, error: emailError } =
      await resend.emails.send(emailPayload);
    // ============================================
    // NEW: BRANCH LOGIC FOR NEW EMAILS VS REPLIES
    // ============================================
    if (isNewEmail && !support_email_id) {
      // ============================================
      // NEW EMAIL FLOW: Create a new thread
      // ============================================
      console.log("Creating new email thread as admin_initiated");

      // Insert new thread into support_emails
      const { data: newThread, error: threadError } = await supabase
        .from("support_emails")
        .insert([
          {
            original_message_id: emailData.id,
            from_email: "mike@worldcanineunion.org", // Sender
            from_name: "Mike at WCU",
            to_email: to, // Store recipient
            subject: subject,
            message_text: message,
            wcu_number: wcu_number,
            status: "sent", // Special status for emails you initiated
            received_at: new Date().toISOString(),
            source: "admin_initiated", // NEW: Tag as admin-initiated
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
        email_type: "support_reply", // You could change to "admin_initiated" if you want
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
    } else {
      // ============================================
      // EXISTING REPLY FLOW (UNCHANGED LOGIC)
      // ============================================
      console.log("Processing reply to existing thread");

      // EXISTING CODE: Log to email_logs table
      const { error: logError } = await supabase.from("email_logs").insert({
        email_type: "support_reply",
        to_email: to,
        from_email: "help@worldcanineunion.org",
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

      // EXISTING CODE: Update support email status
      const { error: statusError } = await supabase
        .from("support_emails")
        .update({ status: "replied" })
        .eq("id", support_email_id);

      if (statusError) {
        console.error("Status update error:", statusError);
      }

      // ============================================
      // NEW: ALSO SAVE THE REPLY AS NEW EMAIL IN THREAD
      // ============================================
      // This ensures replies show up in the thread view
      const { error: replyInsertError } = await supabase
        .from("support_emails")
        .insert([
          {
            original_message_id: emailData.id,
            from_email: "help@worldcanineunion.org",
            from_name: "World Canine Union",
            to_email: to,
            subject: subject,
            message_text: message,
            wcu_number: wcu_number,
            status: "sent",
            received_at: new Date().toISOString(),
            source: "admin_reply", // NEW: Tag as admin reply
            in_reply_to: support_email_id, // Link to parent email
          },
        ]);

      if (replyInsertError) {
        console.error("Reply insert error:", replyInsertError);
        // Non-critical - don't throw
      }
    }

    return NextResponse.json({
      success: true,
      messageId: emailData.id,
      message: isNewEmail
        ? "New email sent and logged"
        : "Reply sent and logged",
      isNewEmail: isNewEmail,
    });
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
