// app/api/chat/submit/route.ts - UPDATED
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message, source = "chat-widget" } = body; // ← ADD source

    // Validate
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Use source to determine subject
    const subject =
      source === "contact-form"
        ? `📋 Contact Form: ${email}` // ← CONTACT FORM
        : `💬 Website Chat: ${email}`; // ← CHAT

    // Send email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "WCU Website Chat <mike@worldcanineunion.org>",
      to: ["mike@worldcanineunion.org"],
      subject: subject, // ← Use variable, not hardcoded
      html: `<div>From: ${email}<br>Message: ${message}</div>`,
      text: `From: ${email}\nMessage: ${message}`,
      replyTo: email,
    });

    if (emailError) throw emailError;

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
