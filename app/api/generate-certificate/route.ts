// app/api/generate-certificate/route.ts - CLEANED
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createClient } from "@supabase/supabase-js";

function drawCenteredMultiLineText(
  page: any,
  text: string,
  centerX: number,
  startY: number,
  fontSize: number,
  font: any,
  color: any,
  maxWidth: number,
  lineHeight: number
) {
  const centerOffset = 15;
  const adjustedCenterX = centerX + centerOffset;

  const avgCharWidth = fontSize * 0.55;

  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + " " + word;
    const testWidth = testLine.length * avgCharWidth;

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  lines.forEach((line, index) => {
    const lineWidth = line.length * avgCharWidth;
    const lineX = adjustedCenterX - lineWidth / 2;

    page.drawText(line, {
      x: lineX,
      y: startY - index * lineHeight,
      size: fontSize,
      font: font,
      color: color,
    });
  });

  return lines.length;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const registrationNumber = data.registration_number;

    if (!registrationNumber) {
      return NextResponse.json(
        { error: "Missing registration_number" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase credentials missing" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: dogData, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("registration_number", registrationNumber)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Dog not found in database" },
        { status: 404 }
      );
    }

    if (!dogData) {
      return NextResponse.json(
        { error: "No data found for this registration number" },
        { status: 404 }
      );
    }

    const pdfBytes = await generateCertificatePDF(dogData);
    const pdfBuffer = Buffer.from(pdfBytes);
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="WCU-${dogData.registration_number}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}

async function generateCertificatePDF(dogData: any) {
  try {
    const pdfDoc = await PDFDocument.create();

    // Load fonts (only standard PDF fonts - no custom fonts)
    const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const courierRegular = await pdfDoc.embedFont(StandardFonts.Courier);
    const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanItalic = await pdfDoc.embedFont(
      StandardFonts.TimesRomanItalic
    );
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const zapfDingbats = await pdfDoc.embedFont(StandardFonts.ZapfDingbats);

    const wcuColors = {
      logo: rgb(0.212, 0.271, 0.31),
      primary: rgb(0.0157, 0.302, 0.251),
      secondary: rgb(0.471, 0.565, 0.612),
      accent: rgb(0.56, 0.12, 0.12),
      gray: rgb(0.9, 0.9, 0.9),
      black: rgb(0, 0, 0),
    };

    function capitalizeFirst(str: string) {
      if (!str) return "Unknown";
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Add a page
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();

    // === BORDER === (Centered)
    const borderMargin = 40;
    const innerBorderMargin = 45;

    // Outer border (centered)
    page.drawRectangle({
      x: borderMargin,
      y: borderMargin,
      width: width - borderMargin * 2,
      height: height - borderMargin * 2,
      borderColor: wcuColors.primary,
      borderWidth: 1,
    });

    // Inner border (centered)
    page.drawRectangle({
      x: innerBorderMargin,
      y: innerBorderMargin,
      width: width - innerBorderMargin * 2,
      height: height - innerBorderMargin * 2,
      borderColor: wcuColors.primary,
      borderWidth: 2,
    });

    // === CORNER SYMBOLS ===
    const cornerSymbol = "❖";
    const symbolSize = 25;
    const horizontalOffsetL = 60;
    const horizontalOffsetR = 65;
    const verticalOffsetT = 70;
    const verticalOffsetB = 55;
    const xAdjust = 8; // ⚡ ADJUST THIS TO CENTER SYMBOLS ⚡

    // Top-Left
    page.drawText(cornerSymbol, {
      x: horizontalOffsetL - xAdjust,
      y: height - verticalOffsetT,
      size: symbolSize,
      font: zapfDingbats,
      color: wcuColors.primary,
    });

    // Top-Right
    page.drawText(cornerSymbol, {
      x: width - horizontalOffsetR - xAdjust,
      y: height - verticalOffsetT,
      size: symbolSize,
      font: zapfDingbats,
      color: wcuColors.primary,
    });

    // Bottom-Left
    page.drawText(cornerSymbol, {
      x: horizontalOffsetL - xAdjust,
      y: verticalOffsetB,
      size: symbolSize,
      font: zapfDingbats,
      color: wcuColors.primary,
    });

    // Bottom-Right
    page.drawText(cornerSymbol, {
      x: width - horizontalOffsetR - xAdjust,
      y: verticalOffsetB,
      size: symbolSize,
      font: zapfDingbats,
      color: wcuColors.primary,
    });

    // === HEADER WITH LOGO ===
    const logoX = 100;
    const titleX = logoX + 105;

    //page.drawText("❤", {
    //x: logoX - 30,
    //y: height - 101,
    //size: 52,
    //font: zapfDingbats,
    //color: wcuColors.accent,
    //});

    page.drawText("World Canine Union", {
      x: logoX + 65,
      y: height - 90,
      size: 33,
      font: timesRoman,
      color: wcuColors.black,
    });

    page.drawText("Global registry for all other dogs", {
      x: logoX + 110,
      y: height - 105,
      size: 12,
      font: helveticaRegular,
      color: wcuColors.black,
    });

    // SUBTITLE
    const subtitleText = "CERTIFICATE OF REGISTRATION";
    const subtitleWidth = subtitleText.length * 16;

    // Main text
    page.drawText(subtitleText, {
      x: (width - subtitleWidth) / 2,
      y: height - 150,
      size: 28,
      font: timesRoman, // ← Regular font for regular text
      color: wcuColors.primary,
    });

    // === GROUP 1: Compact Fields ===
    const startX = 100;
    let currentY = height - 180;

    // USE REAL DATA from dogData
    const group1Fields = [
      {
        label: "Certificate Number:",
        value: dogData.registration_number,
      },
      { label: "Date Issued:", value: new Date().toLocaleDateString() },

      { label: "Name:", value: dogData.dog_name },
      {
        label: "Gender:",
        value: dogData.gender.charAt(0).toUpperCase() + dogData.gender.slice(1),
      },
      {
        label: "Birth Date:",
        value: new Date(dogData.birth_date).toLocaleDateString() || "Unknown",
      },
      {
        label: "Gotcha Day:",
        value: new Date(dogData.gotcha_date).toLocaleDateString(),
      },
      { label: "Owner(s):", value: dogData.owner_name },
    ];

    // GROUP 1: Label and value on same line
    group1Fields.forEach((field, index) => {
      const fieldY = currentY - index * 26;

      // Label
      page.drawText(field.label, {
        x: startX,
        y: fieldY,
        size: 11,
        font: helveticaRegular,
        color: wcuColors.black,
      });

      // Value
      page.drawText(field.value, {
        x: startX + 125,
        y: fieldY,
        size: 12,
        font: helveticaRegular,
        color: wcuColors.primary,
      });
    });

    // === SPACER BETWEEN GROUPS ===
    const spacerY = currentY - group1Fields.length * 23 - 14;
    page.drawLine({
      start: { x: startX, y: spacerY },
      end: { x: startX + 420, y: spacerY },
      thickness: 0.5,
      color: wcuColors.secondary,
      dashArray: [2, 3],
    });

    // === GROUP 2: Multi-line Fields ===
    let group2Y = spacerY - 25;

    const group2Fields = [
      {
        label: "Breed(s):",
        value: dogData.breed_description || "Mixed breed",
        lineLimit: 3,
      },
      {
        label: "Color:",
        value: dogData.dog_color || "Various colors",
        lineLimit: 1,
      },
      {
        label: "Physical Description & Markings:",
        value: dogData.dog_description || "No markings specified",
        lineLimit: 3,
      },
    ];

    // Custom spacing: [Breed, Color, Markings]
    const fieldSpacings = [0, 67, 120];

    group2Fields.forEach((field, index) => {
      const fieldY = group2Y - fieldSpacings[index];

      // Label
      page.drawText(field.label, {
        x: startX,
        y: fieldY,
        size: 11,
        font: helveticaRegular,
        color: wcuColors.black,
      });

      // Value
      page.drawText(field.value, {
        x: startX,
        y: fieldY - 16,
        size: 12,
        font: helveticaRegular,
        color: wcuColors.primary,
        maxWidth: 400,
        lineHeight: 14,
      });
    });

    // === CERTIFICATE TEXT (CLEAN LEFT-ALIGNED) ===
    const lastGroup2Y = group2Y - group2Fields.length * 65;
    const certTextY = lastGroup2Y - 0;

    const dogName = dogData.dog_name || "This dog";
    const certText = `This document certifies that ${dogName} is officially registered with the World Canine Union.`;

    // Match your other field styling
    const fontSize = 12;
    const lineHeight = 16;
    const textX = 100;
    const maxWidth = 500;

    // Simple line splitting
    const words = certText.split(" ");
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + " " + words[i];
      const testWidth = testLine.length * fontSize * 0.6;

      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);

    // Draw left-aligned
    lines.forEach((line, index) => {
      page.drawText(line, {
        x: textX,
        y: certTextY - index * lineHeight,
        size: fontSize,
        font: helveticaRegular,
        color: wcuColors.accent,
      });
    });

    // === HORIZONTAL ROW: SEAL & SIGNATURES ===
    const signaturesY = 120; // Position signatures and seal at this Y coordinate
    const pageCenterX = page.getWidth() / 2;

    // 1. CENTERED SEAL/LOGO
    const LOGO_Y_POSITION = signaturesY; // Same Y as signatures

    // Draw centered seal/logo
    page.drawEllipse({
      x: pageCenterX,
      y: LOGO_Y_POSITION,
      xScale: 50,
      yScale: 50,
      borderColor: wcuColors.primary,
      borderWidth: 1.5,
    });

    page.drawEllipse({
      x: pageCenterX,
      y: LOGO_Y_POSITION,
      xScale: 45,
      yScale: 45,
      borderColor: wcuColors.primary,
      borderWidth: 0.5,
      borderDashArray: [2, 2],
    });

    page.drawText("✪", {
      x: pageCenterX - 9,
      y: LOGO_Y_POSITION + 15,
      size: 25,
      font: zapfDingbats,
      color: wcuColors.accent,
    });

    page.drawText("WCU", {
      x: pageCenterX - 36,
      y: LOGO_Y_POSITION - 12,
      size: 30,
      font: timesRoman,
      color: wcuColors.primary,
    });

    page.drawText("~ REGISTERED ~", {
      x: pageCenterX - 32,
      y: LOGO_Y_POSITION - 23,
      size: 8,
      font: helveticaRegular,
      color: wcuColors.primary,
    });

    // 2. LEFT SIGNATURE (Michael Turko)
    const signatureSpacing = 140; // Space from center to each signature
    const signature1X = pageCenterX - signatureSpacing - 65; // 65 = half of signature width

    page.drawText("Michael Turko", {
      x: signature1X + 15,
      y: signaturesY,
      size: 17,
      font: timesRomanItalic,
      color: wcuColors.primary,
    });

    page.drawLine({
      start: { x: signature1X, y: signaturesY - 5 },
      end: { x: signature1X + 130, y: signaturesY - 5 },
      thickness: 0.5,
      color: wcuColors.secondary,
    });

    page.drawText("Director, World Canine Union", {
      x: signature1X + 7,
      y: signaturesY - 16,
      size: 9,
      font: helveticaRegular,
      color: wcuColors.black,
    });

    // 3. RIGHT SIGNATURE (Elayne Dell)
    const signature2X = pageCenterX + signatureSpacing - 65; // 65 = half of signature width

    page.drawText("Elayne Dell", {
      x: signature2X + 25,
      y: signaturesY,
      size: 17,
      font: timesRomanItalic,
      color: wcuColors.primary,
    });

    page.drawLine({
      start: { x: signature2X, y: signaturesY - 5 },
      end: { x: signature2X + 130, y: signaturesY - 5 },
      thickness: 0.5,
      color: wcuColors.secondary,
    });

    page.drawText("Co-Director, World Canine Union", {
      x: signature2X,
      y: signaturesY - 16,
      size: 9,
      font: helveticaRegular,
      color: wcuColors.black,
    });

    // Save and return
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw error;
  }
}

function formatDate(dateString: string): string {
  if (!dateString) return "Not specified";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}
