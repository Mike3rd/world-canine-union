// app/api/webhooks/resend/route.ts - COMPLETE WORKING VERSION
import { NextRequest, NextResponse } from "next/server";

// Simple health check for GET requests
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "online",
    service: "Resend Webhook Handler",
    timestamp: new Date().toISOString(),
    instructions: "POST email.received events to this endpoint",
  });
}

// Handle POST requests (Resend webhooks)
export async function POST(request: NextRequest) {
  try {
    console.log("📨 Webhook received at:", new Date().toISOString());

    // Get the raw body first for logging
    const rawBody = await request.text();
    console.log("Raw body length:", rawBody.length);

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Log what we received
    console.log("📦 Webhook payload:", {
      type: body.type || "unknown",
      hasData: !!body.data,
      dataKeys: body.data ? Object.keys(body.data) : [],
    });

    // Only process 'email.received' events
    if (body.type === "email.received") {
      console.log("✅ Email received event:", {
        from: body.data?.from,
        subject: body.data?.subject?.substring(0, 50) + "...",
        timestamp: new Date().toISOString(),
      });
    }

    // Always return success to Resend
    return NextResponse.json({
      success: true,
      received: true,
      processed: body.type === "email.received",
    });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
