// app/api/webhooks/resend/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role for webhooks
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook signature (Resend provides this)
    const signature = request.headers.get("x-resend-signature");
    const body = await request.text();

    // TODO: Add signature verification logic here
    // Resend will provide docs on how to verify

    const data = JSON.parse(body);

    // Extract email data from Resend webhook
    const emailData = {
      original_message_id: data.id,
      from_email: data.from,
      from_name: data.from?.replace(/<[^>]*>/g, "").trim() || data.from,
      subject: data.subject,
      message_text: data.text,
      message_html: data.html,
      received_at: new Date().toISOString(),
      // Try to extract WCU number from subject/body
      wcu_number: extractWcuNumber(data.subject, data.text),
      status: "unread" as const,
    };

    // Save to your new support_emails table
    const { error } = await supabase.from("support_emails").insert([emailData]);

    if (error) {
      console.error("Failed to save email:", error);
      return NextResponse.json(
        { error: "Failed to process email" },
        { status: 500 }
      );
    }

    console.log("✅ Email saved:", emailData.subject);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Invalid webhook payload" },
      { status: 400 }
    );
  }
}

// Helper function to extract WCU numbers
function extractWcuNumber(subject: string, body: string): string | null {
  const wcuRegex = /WCU-\d{5}/i;

  // Check subject first
  const subjectMatch = subject.match(wcuRegex);
  if (subjectMatch) return subjectMatch[0].toUpperCase();

  // Check body
  const bodyMatch = body.match(wcuRegex);
  if (bodyMatch) return bodyMatch[0].toUpperCase();

  return null;
}
