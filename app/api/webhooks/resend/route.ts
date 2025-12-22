// app/api/webhooks/resend/route.ts - UPDATED FOR ALL EVENTS
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = body.type;

    console.log(`📨 Resend webhook: ${eventType}`, {
      timestamp: new Date().toISOString(),
      messageId: body.data?.messageId || body.data?.id,
    });

    // Route different event types
    switch (eventType) {
      case "email.received":
        return await handleEmailReceived(body);

      case "email.sent":
      case "email.delivered":
      case "email.bounced":
      case "email.complained":
      case "email.opened":
      case "email.clicked":
        return await handleEmailStatusUpdate(eventType, body);

      default:
        console.log(`⚠️ Unhandled event type: ${eventType}`);
        return NextResponse.json({ received: true, unhandled: eventType });
    }
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// Handle incoming support emails
async function handleEmailReceived(body: any) {
  const emailData = {
    original_message_id: body.data?.id,
    from_email: body.data?.from,
    from_name: extractName(body.data?.from),
    subject: body.data?.subject || "(no subject)",
    message_text: body.data?.text || "",
    message_html: body.data?.html || "",
    received_at: new Date().toISOString(),
    wcu_number: extractWcuNumber(body.data?.subject, body.data?.text),
    status: "unread" as const,
    raw_payload: body,
  };

  const { error } = await supabase.from("support_emails").insert([emailData]);

  if (error) {
    console.error("❌ Failed to save support email:", error);
  }

  return NextResponse.json({
    success: true,
    saved: !error,
    event: "email.received",
  });
}

// Handle outgoing email status updates
async function handleEmailStatusUpdate(eventType: string, body: any) {
  const messageId = body.data?.messageId;
  if (!messageId) {
    console.log("⚠️ No messageId in status update");
    return NextResponse.json({ success: false, error: "No messageId" });
  }

  // Map event to database field
  const statusMap: Record<string, { field: string; status: string }> = {
    "email.sent": { field: "sent_at", status: "sent" },
    "email.delivered": { field: "delivered_at", status: "delivered" },
    "email.bounced": { field: "bounced_at", status: "bounced" },
    "email.complained": { field: "complained_at", status: "complained" },
    "email.opened": { field: "opened_at", status: "opened" },
    "email.clicked": { field: "clicked_at", status: "clicked" },
  };

  const mapping = statusMap[eventType];
  if (!mapping) {
    return NextResponse.json({ success: false, error: "Unknown event" });
  }

  // Update the email_logs table
  const updateData: any = {
    [mapping.field]: new Date().toISOString(),
    current_status: mapping.status,
    updated_at: new Date().toISOString(),
  };

  // Add bounce/complaint reasons if available
  if (eventType === "email.bounced" && body.data?.bounce) {
    updateData.bounced_reason = body.data.bounce.type;
  }

  const { error } = await supabase
    .from("email_logs")
    .update(updateData)
    .eq("resend_message_id", messageId);

  if (error) {
    console.error(`❌ Failed to update email status (${eventType}):`, error);
  }

  return NextResponse.json({
    success: true,
    updated: !error,
    event: eventType,
    messageId,
  });
}

// Helper functions (same as before)
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
