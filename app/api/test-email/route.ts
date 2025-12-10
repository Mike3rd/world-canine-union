import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await sendWelcomeEmail({
      to: body.to || "mturko@outlook.com", // ← YOUR EMAIL
      dogName: body.dogName || "Test Dog",
      ownerName: body.ownerName || "Test Owner",
      wcuNumber: body.wcuNumber || "WCU-TEST001",
      pdfUrl:
        body.pdfUrl ||
        "https://worldcanineunion.org/api/certificates/WCU-00091",
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
