// app/admin/emails/api/reply/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "../../../../src/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, support_email_id, wcu_number } = body;

    // 1. Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "World Canine Union <help@worldcanineunion.org>",
      to: [to],
      subject: subject,
      html: `<div style="font-family: sans-serif; line-height: 1.6;">
               <p>${message.replace(/\n/g, "<br>")}</p>
               <br>
               <p style="color: #78909C; font-size: 12px;">
                 World Canine Union Support<br>
                 help@worldcanineunion.org
               </p>
             </div>`,
      text: message,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error(emailError.message);
    }

    // 2. Log to email_logs table
    const { error: logError } = await supabase.from("email_logs").insert({
      email_type: "support_reply",
      to_email: to,
      from_email: "help@worldcanineunion.org",
      subject: subject,
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

    // 3. Update support email status
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
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: "Failed to send reply",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
