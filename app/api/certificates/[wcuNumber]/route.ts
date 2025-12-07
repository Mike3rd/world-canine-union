import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { wcuNumber: string } }
) {
  try {
    const { wcuNumber } = params;

    console.log("📄 Certificate download requested for:", wcuNumber);

    // 1. Get registration with PDF URL
    const { data: registration, error } = await supabase
      .from("registrations")
      .select("pdf_url, dog_name")
      .eq("registration_number", wcuNumber)
      .single();

    if (error || !registration?.pdf_url) {
      console.error("❌ Certificate not found:", wcuNumber);
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    // 2. Fetch PDF from Supabase Storage
    const response = await fetch(registration.pdf_url);

    if (!response.ok) {
      console.error("❌ Failed to fetch PDF from Supabase");
      return NextResponse.json(
        { error: "Failed to load certificate" },
        { status: 500 }
      );
    }

    // 3. Get PDF as buffer
    const pdfBuffer = await response.arrayBuffer();

    // 4. Return PDF with proper headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="WCU-Certificate-${wcuNumber}.pdf"`,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("❌ Certificate proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
