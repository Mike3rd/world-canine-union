// app/api/generate-certificate/route.ts - HEADER ADJUSTED
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

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
  // ADD THIS LINE:
  const centerOffset = 15; // Adjust this: 10, 12, 15
  const adjustedCenterX = centerX + centerOffset; // Use this instead of centerX

  const avgCharWidth = fontSize * 0.55; // Keep this

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
    // CHANGE THIS LINE: use adjustedCenterX instead of centerX
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

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontsPath = path.join(process.cwd(), "public", "fonts");

    // Load fonts
    let greatVibes;

    try {
      greatVibes = await pdfDoc.embedFont(
        fs.readFileSync(
          path.join(fontsPath, "great-vibes", "GreatVibes-Regular.ttf")
        )
      );
    } catch {
      greatVibes = await pdfDoc.embedFont(StandardFonts.Helvetica);
    }

    const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const courierRegular = await pdfDoc.embedFont(StandardFonts.Courier);
    const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const wcuColors = {
      primary: rgb(0.212, 0.271, 0.31), // #36454F - Charcoal
      secondary: rgb(0.471, 0.565, 0.612), // #78909C - Steel blue
      accent: rgb(0.6, 0.141, 0), // #992400 - Burnt orange
      gray: rgb(0.9, 0.9, 0.9),
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
      borderDashArray: [5, 5],
    });

    // === HEADER WITH LOGO ===
    const logoX = 100; // Logo on left
    const titleX = logoX + 80; // Title closer to logo (was width/2 + 40)

    // LOGO PLACEHOLDER (left of title)
    page.drawRectangle({
      x: logoX,
      y: height - 130,
      width: 60,
      height: 60,
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
      borderDashArray: [2, 2],
    });

    page.drawText("LOGO", {
      x: logoX + 15,
      y: height - 90,
      size: 10,
      font: helveticaRegular,
      color: rgb(0.6, 0.6, 0.6),
    });

    // TITLE (closer to logo)
    const titleText = "World Canine Union";
    page.drawText(titleText, {
      x: titleX,
      y: height - 100,
      size: 36,
      font: timesRoman,
      color: wcuColors.primary,
    });

    // SUBTITLE (under title, aligned)
    const subtitleText = "CERTIFICATE OF REGISTRATION";
    page.drawText(subtitleText, {
      x: titleX + 7,
      y: height - 125,
      size: 19,
      font: timesRoman,
      color: wcuColors.secondary,
    });

    // === GROUP 1: Compact Fields (same line) ===
    const startX = 100;
    let currentY = height - 170;

    const group1Fields = [
      { label: "Certificate Number:", value: "WCU-00030" },
      { label: "Date Issued:", value: "12/1/2025" },
      { label: "Name of Dog:", value: "Sam" },
      { label: "Sex of Dog:", value: "Male" },
      { label: "Name of Owner:", value: "Mike Turko" },
      { label: "Gotcha Day:", value: "11/29/2025" },
    ];

    // GROUP 1: Label and value on same line, tight spacing
    group1Fields.forEach((field, index) => {
      const fieldY = currentY - index * 26; // Tighter spacing (28 vs 35)

      // Label
      page.drawText(field.label, {
        x: startX,
        y: fieldY,
        size: 11,
        font: helveticaRegular,
        color: wcuColors.secondary,
      });

      // Value (right after label)
      page.drawText(field.value, {
        x: startX + 160, // Fixed position for alignment
        y: fieldY,
        size: 14,
        font: courierRegular,
        color: rgb(0, 0, 0),
      });
    });

    // === SPACER BETWEEN GROUPS ===
    const spacerY = currentY - group1Fields.length * 23 - 20;
    page.drawLine({
      start: { x: startX, y: spacerY },
      end: { x: startX + 400, y: spacerY },
      thickness: 0.5,
      color: rgb(0.9, 0.9, 0.9),
    });

    // === GROUP 2: Multi-line Fields (3 lines each) ===
    let group2Y = spacerY - 30;

    const group2Fields = [
      {
        label: "Breed(s) of Dog:",
        value:
          "White chest patch, brown spots on back, black nose, white tip on tail, distinctive eyebrows, small scar on left ear, unique heart-shaped pattern on right shoulder",
        lineLimit: 3,
      },
      {
        label: "Color of Dog:",
        value:
          "White chest patch, brown spots on back, black nose, white tip on tail, distinctive eyebrows, small scar on left ear, unique heart-shaped pattern on right shoulder",
        lineLimit: 3,
      },
      {
        label: "Markings of Dog:",
        value:
          "White chest patch, brown spots on back, black nose, white tip on tail, distinctive eyebrows, small scar on left ear, unique heart-shaped pattern on right shoulder",
        lineLimit: 3,
      },
    ];

    group2Fields.forEach((field, index) => {
      const fieldY = group2Y - index * 75; // More space for multi-line

      // Label
      page.drawText(field.label, {
        x: startX,
        y: fieldY,
        size: 11,
        font: helveticaRegular,
        color: wcuColors.secondary,
      });

      // Value with line limit
      const maxHeight = field.lineLimit * 18;
      page.drawText(field.value, {
        x: startX,
        y: fieldY - 16, // Start below label
        size: 12,
        font: courierRegular,
        color: rgb(0, 0, 0),
        maxWidth: 400,
        lineHeight: 14,
      });
    });

    // === CERTIFICATE TEXT (DYNAMIC CENTERING) ===
    const lastGroup2Y = group2Y - group2Fields.length * 65;
    const certTextY = lastGroup2Y - 40;

    // Use dynamic text
    const dogName = "SamSam SamSam"; // Would come from database
    const certText = `This document certifies that ${dogName} is officially registered with the World Canine Union`;

    // Draw with centering
    drawCenteredMultiLineText(
      page,
      certText,
      centerX, // Center of page
      certTextY, // Starting Y position
      12, // Font size
      helveticaRegular, // Font
      wcuColors.primary, // Color
      400, // Max width
      16 // Line height
    );

    // === HORIZONTAL ROW: SEAL & SIGNATURES ===
    const rowY = certTextY - 80;
    const rowStartX = 110;
    const spacing = 150; // Space between signatures
    const spacingsig1 = 100; // Space between seal and sig1

    // 1. SEAL (Left)
    page.drawRectangle({
      x: rowStartX,
      y: rowY - 40,
      width: 80,
      height: 80,
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
      borderDashArray: [2, 2],
    });

    // 2. FIRST SIGNATURE (Center)
    const signature1X = rowStartX + spacingsig1;
    page.drawText("Michael Turko", {
      x: signature1X,
      y: rowY,
      size: 24,
      font: greatVibes,
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
      y: rowY - 18,
      size: 9,
      font: helveticaRegular,
      color: rgb(0.4, 0.4, 0.4),
    });

    // 3. SECOND SIGNATURE (Right)
    const signature2X = signature1X + spacing;
    page.drawText("Elayne Dell", {
      x: signature2X,
      y: rowY,
      size: 24,
      font: greatVibes,
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
      y: rowY - 18,
      size: 9,
      font: helveticaRegular,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Save and return
    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="wcu-certificate.pdf"',
      },
    });
  } catch (error: any) {
    console.error("Certificate Error:", error);
    return NextResponse.json(
      { error: "Certificate generation failed" },
      { status: 500 }
    );
  }
}
