// app/api/webhooks/resend/route.ts - UPDATED
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Get signature for verification
    const signature = request.headers.get("x-resend-signature");
    const body = await request.text();
    const data = JSON.parse(body);

    // Check the event type
    const eventType = data.type; // 'email.received', 'email.sent', etc.

    console.log(`📨 Resend webhook: ${eventType}`, {
      from: data.data?.from,
      subject: data.data?.subject,
      timestamp: new Date().toISOString(),
    });

    // ONLY process 'email.received' events (forwarded emails)
    if (eventType !== "email.received") {
      console.log(`Skipping ${eventType} event`);
      return NextResponse.json({ received: true });
    }

    // Extract email data for 'email.received' events
    const emailData = {
      original_message_id: data.data?.id,
      from_email: data.data?.from,
      from_name: extractName(data.data?.from),
      subject: data.data?.subject,
      message_text: data.data?.text,
      message_html: data.data?.html,
      received_at: new Date().toISOString(),
      wcu_number: extractWcuNumber(data.data?.subject, data.data?.text),
      status: "unread",
      raw_payload: data, // Store full payload for debugging
    };

    // Save to database
    const { error } = await supabase.from("support_emails").insert([emailData]);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save email" },
        { status: 500 }
      );
    }

    console.log("✅ Email saved to support_emails:", emailData.subject);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}

// Helper functions
function extractName(from: string): string {
  if (!from) return "Unknown";
  // Extract "John Doe" from "John Doe <john@example.com>"
  const nameMatch = from.match(/^([^<]+)</);
  return nameMatch ? nameMatch[1].trim() : from;
}

function extractWcuNumber(subject: string, body: string): string | null {
  const wcuRegex = /WCU-\d{5}/i;
  const subjectMatch = subject?.match(wcuRegex);
  const bodyMatch = body?.match(wcuRegex);
  return subjectMatch?.[0] || bodyMatch?.[0] || null;
}
