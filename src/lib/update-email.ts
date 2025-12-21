// /lib/update-email.ts
import { UpdateRequestEmail } from "@/emails/UpdateRequestEmail";

export async function sendUpdateRequestEmail({
  to,
  dogName,
  ownerName,
  wcuNumber,
  updateLink,
  hoursValid = 24,
}: {
  to: string;
  dogName: string;
  ownerName: string;
  wcuNumber: string;
  updateLink: string;
  hoursValid?: number;
}) {
  // Check if we should use API or simulate
  const useApi = process.env.NEXT_PUBLIC_USE_EMAIL_API === "true";

  if (!useApi) {
    // Simulation mode (current behavior for development)
    console.log("📧 [SIMULATED] Would send update request email to:", to);
    console.log("📧 Dog:", dogName, "WCU:", wcuNumber);
    console.log("📧 Update Link:", updateLink);
    return { success: true, simulated: true };
  }

  // Production: Call the API route (server-side)
  try {
    const response = await fetch("/api/send-update-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        dogName,
        ownerName,
        wcuNumber,
        updateLink,
        hoursValid,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ API email sending failed:", result.error);
      return {
        success: false,
        error: result.error,
        simulated: result.simulated || false,
      };
    }

    console.log("✅ API email sent successfully");
    return { success: true, data: result.data };
  } catch (error) {
    console.error("❌ API call error:", error);
    // Fall back to simulation if API fails
    console.log(
      "📧 [FALLBACK SIMULATION] Would send update request email to:",
      to
    );
    console.log("📧 Dog:", dogName, "WCU:", wcuNumber);
    console.log("📧 Update Link:", updateLink);
    return {
      success: true,
      simulated: true,
      error: "API failed, using simulation",
    };
  }
}
