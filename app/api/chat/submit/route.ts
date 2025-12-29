// app/api/chat/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message } = body;
    console.log("📨 Chat submit received:", {
      email,
      messageLength: message?.length,
    });

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 1. Send email notification via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "WCU Website Chat <mike@worldcanineunion.org>",
      to: ["worldcanineunion@outlook.com"],
      subject: `Website Chat from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #36454F;">
          <h2 style="color: #992400;">New Website Chat Message</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #992400; margin: 15px 0;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p><em>Received via WCU website chat widget</em></p>
        </div>
      `,
      text: `New Chat Message\n\nFrom: ${email}\n\nMessage:\n${message}\n\n---\nReceived via WCU website chat widget`,
      replyTo: email,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error(emailError.message);
    }

    // 2. Optional: Save to database for analytics
    // Save to database (with proper logging)
    const { data: dbResult, error: dbError } = await supabase
      .from("support_emails")
      .insert([
        {
          original_message_id: emailData.id,
          from_email: email,
          from_name: "Website Chat User",
          to_email: "mike@worldcanineunion.org",
          subject: `Chat: ${message.substring(0, 50)}...`,
          message_text: message,
          received_at: new Date().toISOString(),
          source: "chat_form",
          status: "unread",
        },
      ])
      .select();

    console.log("💾 Database insert:", {
      success: !dbError,
      error: dbError?.message,
      insertedId: dbResult?.[0]?.id,
    });

    if (dbError) {
      console.error("Database save failed:", dbError);
      // Continue anyway - don't show error to user
    }

    return NextResponse.json({
      success: true,
      messageId: emailData.id,
      message: "Chat message sent successfully",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to send chat message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
