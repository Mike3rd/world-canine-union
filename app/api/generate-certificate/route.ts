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
      primary: rgb(0.212, 0.271, 0.31),
      secondary: rgb(0.471, 0.565, 0.612),
      accent: rgb(0.6, 0.141, 0),
      gray: rgb(0.9, 0.9, 0.9),
      black: rgb(0, 0, 0),
    };

    // Add a page
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();

    // Keep centerX for bottom text
    const centerX = width / 2;

    // === BORDER ===
    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderColor: wcuColors.secondary,
      borderWidth: 1,
    });

    page.drawRectangle({
      x: 45,
      y: 45,
      width: width - 90,
      height: height - 90,
      borderColor: wcuColors.secondary,
      borderWidth: 2,
    });

    // === HEADER WITH LOGO ===
    const logoX = 100;
    const titleX = logoX + 105;

    page.drawText("❤", {
      x: logoX - 30,
      y: height - 101,
      size: 52,
      font: zapfDingbats,
      color: wcuColors.accent,
    });

    page.drawText("World Canine Union", {
      x: logoX + 18,
      y: height - 90,
      size: 33,
      font: timesRoman,
      color: wcuColors.primary,
    });

    page.drawText("Global Registry for All Other Dogs", {
      x: logoX + 25,
      y: height - 105,
      size: 12,
      font: helveticaRegular,
      color: wcuColors.primary,
    });

    // SUBTITLE
    const subtitleText = "CERTIFICATE OF REGISTRATION";
    const subtitleWidth = subtitleText.length * 13.5;

    // Left Zapf star
    page.drawText("✵", {
      x: (width - subtitleWidth) / 2 - 25,
      y: height - 150,
      size: 20,
      font: zapfDingbats, // ← Must use zapfDingbats font!
      color: wcuColors.secondary,
    });

    // Main text
    page.drawText(subtitleText, {
      x: (width - subtitleWidth) / 2,
      y: height - 150,
      size: 24,
      font: timesRoman, // ← Regular font for regular text
      color: wcuColors.secondary,
    });

    // Right Zapf star
    page.drawText("✵", {
      x: (width + subtitleWidth) / 2 + 15,
      y: height - 150,
      size: 20,
      font: zapfDingbats, // ← Must use zapfDingbats font!
      color: wcuColors.secondary,
    });

    // === GROUP 1: Compact Fields ===
    const startX = 100;
    let currentY = height - 190;

    // USE REAL DATA from dogData
    const group1Fields = [
      {
        label: "Certificate Number:",
        value: dogData.registration_number || "WCU-00000",
      },
      { label: "Date Issued:", value: new Date().toLocaleDateString() },
      { label: "Name of Dog:", value: dogData.dog_name || "Unknown" },
      { label: "Sex of Dog:", value: dogData.gender || "Unknown" },
      { label: "Name of Owner:", value: dogData.owner_name || "Unknown" },
      {
        label: "Gotcha Day:",
        value: dogData.gotcha_date
          ? new Date(dogData.gotcha_date).toLocaleDateString()
          : "Unknown",
      },
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
        color: wcuColors.secondary,
      });

      // Value
      page.drawText(field.value, {
        x: startX + 125,
        y: fieldY,
        size: 14,
        font: courierRegular,
        color: wcuColors.black,
      });
    });

    // === SPACER BETWEEN GROUPS ===
    const spacerY = currentY - group1Fields.length * 23 - 20;
    page.drawLine({
      start: { x: startX, y: spacerY },
      end: { x: startX + 400, y: spacerY },
      thickness: 0.5,
      color: wcuColors.gray,
    });

    // === GROUP 2: Multi-line Fields ===
    let group2Y = spacerY - 33;

    const group2Fields = [
      {
        label: "Breed(s) of Dog:",
        value: dogData.breed_description || "Mixed breed",
        lineLimit: 3,
      },
      {
        label: "Color of Dog:",
        value: dogData.dog_color || "Various colors",
        lineLimit: 1,
      },
      {
        label: "Markings of Dog:",
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
        color: wcuColors.secondary,
      });

      // Value
      page.drawText(field.value, {
        x: startX,
        y: fieldY - 16,
        size: 12,
        font: courierRegular,
        color: wcuColors.black,
        maxWidth: 400,
        lineHeight: 14,
      });
    });

    // === CERTIFICATE TEXT (CLEAN LEFT-ALIGNED) ===
    const lastGroup2Y = group2Y - group2Fields.length * 65;
    const certTextY = lastGroup2Y - 0;

    const dogName = dogData.dog_name || "This dog";
    const certText = `This document certifies that ${dogName} is officially registered with the World Canine Union`;

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
        color: wcuColors.secondary,
      });
    });

    // === HORIZONTAL ROW: SEAL & SIGNATURES ===
    const rowY = certTextY - 95;
    const rowStartX = 90;
    const spacing = 155;
    const spacingsig1 = 135;

    // 1. SEAL
    page.drawEllipse({
      x: rowStartX + 60,
      y: rowY,
      xScale: 50,
      yScale: 50,
      borderColor: wcuColors.primary,
      borderWidth: 1.5,
    });

    page.drawEllipse({
      x: rowStartX + 60,
      y: rowY,
      xScale: 45,
      yScale: 45,
      borderColor: wcuColors.primary,
      borderWidth: 0.5,
      borderDashArray: [2, 2],
    });

    page.drawText("✪", {
      x: rowStartX + 51,
      y: rowY + 15,
      size: 25,
      font: zapfDingbats,
      color: wcuColors.accent,
    });

    page.drawText("WCU", {
      x: rowStartX + 24,
      y: rowY - 12,
      size: 30,
      font: timesRoman,
      color: wcuColors.primary,
    });

    page.drawText("• REGISTERED •", {
      x: rowStartX + 26,
      y: rowY - 23,
      size: 9,
      font: helveticaRegular,
      color: wcuColors.primary,
    });

    // 2. FIRST SIGNATURE (Center)
    const signature1X = rowStartX + spacingsig1;
    page.drawText("Michael Turko", {
      x: signature1X,
      y: rowY,
      size: 16,
      font: courierRegular,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawLine({
      start: { x: signature1X, y: rowY - 5 },
      end: { x: signature1X + 140, y: rowY - 5 },
      thickness: 0.5,
      color: wcuColors.secondary,
    });

    page.drawText("Director, World Canine Union", {
      x: signature1X,
      y: rowY - 16,
      size: 9,
      font: helveticaRegular,
      color: rgb(0.4, 0.4, 0.4),
    });

    // 3. SECOND SIGNATURE (Right)
    const signature2X = signature1X + spacing;
    page.drawText("Elayne Dell", {
      x: signature2X,
      y: rowY,
      size: 16,
      font: courierRegular,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawLine({
      start: { x: signature2X, y: rowY - 5 },
      end: { x: signature2X + 140, y: rowY - 5 },
      thickness: 1,
      color: wcuColors.secondary,
    });

    page.drawText("Co-Director, World Canine Union", {
      x: signature2X,
      y: rowY - 16,
      size: 9,
      font: helveticaRegular,
      color: rgb(0.4, 0.4, 0.4),
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
