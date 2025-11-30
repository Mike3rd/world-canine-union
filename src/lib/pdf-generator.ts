import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateCertificate(registrationData: any) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page - certificate size
  const page = pdfDoc.addPage([600, 400]);

  // Set up fonts (using standard PDF fonts for now)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Draw decorative border
  page.drawRectangle({
    x: 10,
    y: 10,
    width: 580,
    height: 380,
    borderColor: rgb(0.2, 0.2, 0.2),
    borderWidth: 2,
  });

  // Header - WORLD CANINE UNION
  page.drawText("WORLD CANINE UNION", {
    x: 50,
    y: 350,
    size: 24,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.4),
  });

  // Certificate Title
  page.drawText("Official Registration Certificate", {
    x: 50,
    y: 320,
    size: 16,
    font: helveticaBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Main certificate text
  page.drawText(
    `This certifies that ${registrationData.dog_name} is officially`,
    {
      x: 50,
      y: 280,
      size: 12,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
    }
  );

  page.drawText("registered with the World Canine Union.", {
    x: 50,
    y: 265,
    size: 12,
    font: helveticaFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  // Registration Details
  const details = [
    `Certificate Number: ${registrationData.registration_number}`,
    `Dog Name: ${registrationData.dog_name}`,
    `Sex: ${registrationData.gender}`,
    `Breed: ${registrationData.breed_description}`,
    `Owner: ${registrationData.owner_name}`,
    `Gotcha Day: ${new Date(
      registrationData.gotcha_date
    ).toLocaleDateString()}`,
    `Date Issued: ${new Date().toLocaleDateString()}`,
  ];

  details.forEach((detail, index) => {
    page.drawText(detail, {
      x: 50,
      y: 220 - index * 15,
      size: 10,
      font: helveticaFont,
      color: rgb(0.1, 0.1, 0.1),
    });
  });

  // Signature section
  page.drawText("_________________________", {
    x: 400,
    y: 100,
    size: 12,
    font: helveticaFont,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText("Director, World Canine Union", {
    x: 400,
    y: 85,
    size: 10,
    font: helveticaFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
