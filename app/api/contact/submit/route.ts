// app/api/chat/submit/route.ts (FINAL)
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message } = body;

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

    // ONLY send email (webhook will save)
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "WCU Website Chat <mike@worldcanineunion.org>",
      to: ["mike@worldcanineunion.org"],
      subject: `Contact Form: ${email}`,
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
