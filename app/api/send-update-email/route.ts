// /app/api/send-update-email/route.ts - NEW FILE
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { UpdateRequestEmail } from "@/emails/UpdateRequestEmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      to,
      dogName,
      ownerName,
      wcuNumber,
      updateLink,
      hoursValid = 24,
    } = body;

    // Initialize Resend inside the API route (server-side)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn("⚠️ RESEND_API_KEY not found in API route.");
      return NextResponse.json(
        {
          success: false,
          error: "Email service not configured",
          simulated: true,
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: "World Canine Union <noreply@worldcanineunion.org>",
      to: [to],
      subject: `Update ${dogName}'s Information - World Canine Union`,
      react: UpdateRequestEmail({
        dogName,
        ownerName,
        wcuNumber,
        updateLink,
        hoursValid,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("❌ Update request email sending failed:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log("✅ Update request email sent successfully:", data?.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Update request email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
