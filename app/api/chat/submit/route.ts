// app/api/chat/submit/route.ts - CLEAN VERSION
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message } = body;

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

    // Generate mock email ID
    const emailData = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Save to database
    await supabase.from("support_emails").insert([
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
    ]);

    return NextResponse.json({
      success: true,
      messageId: emailData.id,
      message: "Message sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to save message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
