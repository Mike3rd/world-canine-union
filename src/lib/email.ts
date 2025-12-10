import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/WelcomeEmail";

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.warn("⚠️ RESEND_API_KEY not found. Emails will not be sent.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendWelcomeEmail({
  to,
  dogName,
  ownerName,
  wcuNumber,
  pdfUrl,
}: {
  to: string;
  dogName: string;
  ownerName: string;
  wcuNumber: string;
  pdfUrl: string;
}) {
  // If Resend isn't configured, just log (for local development)
  if (!resend) {
    console.log("📧 [SIMULATED] Would send email to:", to);
    console.log("📧 Dog:", dogName, "WCU:", wcuNumber);
    console.log("📧 PDF URL:", pdfUrl);
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "World Canine Union <noreply@worldcanineunion.org>",
      to: [to],
      subject: `Welcome to World Canine Union! Your Registration: ${wcuNumber}`,
      react: WelcomeEmail({
        dogName,
        ownerName,
        wcuNumber,
        pdfUrl,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("❌ Email sending failed:", error);
      return { success: false, error };
    }

    console.log("✅ Email sent successfully:", data?.id);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Email error:", error);
    return { success: false, error };
  }
}
