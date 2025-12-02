// app/api/generate-certificate/route.ts - GROUPED FIELDS
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontsPath = path.join(process.cwd(), "public", "fonts");

    // Load fonts
    let oxanium, cormorant, greatVibes;

    try {
      oxanium = await pdfDoc.embedFont(
        fs.readFileSync(
          path.join(fontsPath, "oxanium", "Oxanium-VariableFont_wght.ttf")
        )
      );
    } catch {
      oxanium = await pdfDoc.embedFont(StandardFonts.Helvetica);
    }

    try {
      cormorant = await pdfDoc.embedFont(
        fs.readFileSync(
          path.join(
            fontsPath,
            "cormorant-garamond",
            "CormorantGaramond-VariableFont_wght.ttf"
          )
        )
      );
    } catch {
      cormorant = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    }

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

    // Add a page
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();

    // === BORDER ===
    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 2,
      borderDashArray: [5, 5],
    });

    // === HEADER ===
    const centerX = width / 2;
    const titleText = "World Canine Union";
    const titleWidth = 35 * titleText.length * 0.5;
    page.drawText(titleText, {
      x: centerX - titleWidth / 2,
      y: height - 100,
      size: 36,
      font: cormorant,
      color: rgb(0, 0, 0),
    });

    const subtitleText = "CERTIFICATE OF REGISTRATION";
    const subtitleWidth = 23 * subtitleText.length * 0.5;
    page.drawText(subtitleText, {
      x: centerX - subtitleWidth / 2,
      y: height - 125,
      size: 20,
      font: cormorant,
      color: rgb(0.3, 0.3, 0.3),
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
        color: rgb(0.4, 0.4, 0.4),
      });

      // Value (right after label)
      page.drawText(field.value, {
        x: startX + 160, // Fixed position for alignment
        y: fieldY,
        size: 14,
        font: oxanium,
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
          "White chest patch, brown spots on back, black nose, white tip on tail, distinctive eyebrows, small scar on left ear, unique heart-shaped pattern on right shoulder when fur grows",
        lineLimit: 2,
      },
      {
        label: "Color of Dog:",
        value:
          "White chest patch, brown spots on back, black nose, white tip on tail, distinctive eyebrows, small scar on left ear, unique heart-shaped pattern on right shoulder when fur grows",
        lineLimit: 1,
      },
      {
        label: "Markings of Dog:",
        value:
          "White chest patch, brown spots on back, black nose, white tip on tail, distinctive eyebrows, small scar on left ear, unique heart-shaped pattern on right shoulder when fur grows",
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
        color: rgb(0.4, 0.4, 0.4),
      });

      // Value with line limit
      const maxHeight = field.lineLimit * 18;
      page.drawText(field.value, {
        x: startX,
        y: fieldY - 20, // Start below label
        size: 14,
        font: oxanium,
        color: rgb(0, 0, 0),
        maxWidth: 400,
        lineHeight: 16,
      });
    });

    // === CERTIFICATE TEXT ===
    const lastGroup2Y = group2Y - group2Fields.length * 65;
    const certTextY = lastGroup2Y - 40;
    page.drawText(
      "This certifies that Sam is officially registered with the World Canine UnionThis certifies that Sam is officially registered with the World Canine .",
      {
        x: centerX - 208,
        y: certTextY,
        size: 12,
        font: helveticaRegular,
        color: rgb(0, 0, 0),
        maxWidth: 400,
        lineHeight: 16,
      }
    );

    // === SEAL & SIGNATURES (same as before) ===
    const sealY = certTextY - 90;

    // Seal placeholder
    page.drawRectangle({
      x: startX,
      y: sealY - 40,
      width: 80,
      height: 80,
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
      borderDashArray: [2, 2],
    });

    page.drawText("OFFICIAL SEAL", {
      x: startX + 10,
      y: sealY - 20,
      size: 8,
      font: helveticaRegular,
      color: rgb(0.6, 0.6, 0.6),
    });

    // Signatures
    const signatureX = width - 400;
    page.drawText("Michael Turko", {
      x: signatureX,
      y: sealY,
      size: 24,
      font: greatVibes,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawLine({
      start: { x: signatureX, y: sealY - 5 },
      end: { x: signatureX + 150, y: sealY - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    page.drawText("Director, World Canine Union", {
      x: signatureX,
      y: sealY - 25,
      size: 11,
      font: helveticaRegular,
      color: rgb(0.4, 0.4, 0.4),
    });

    const signature2Y = sealY - 70;
    page.drawText("Elayne Dell", {
      x: signatureX,
      y: signature2Y,
      size: 24,
      font: greatVibes,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawLine({
      start: { x: signatureX, y: signature2Y - 5 },
      end: { x: signatureX + 150, y: signature2Y - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    page.drawText("Co-Director, World Canine Union", {
      x: signatureX,
      y: signature2Y - 25,
      size: 11,
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
