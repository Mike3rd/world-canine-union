// lib/pdf-regeneration.ts - COMPLETE FIXED VERSION
import { supabase } from "@/lib/supabase";
import { generateCertificatePDF } from "../../app/api/generate-certificate/route";

export async function regenerateCertificate(wcuNumber: string) {
  console.log(`Starting PDF regeneration for: ${wcuNumber}`);

  try {
    // 1. Get the dog's data by WCU NUMBER, not UUID
    const { data: dog, error: fetchError } = await supabase
      .from("registrations")
      .select("*")
      .eq("registration_number", wcuNumber)
      .single();

    if (fetchError) {
      console.error("Error fetching dog data:", fetchError);
      throw new Error(`Dog not found: ${fetchError.message}`);
    }

    console.log(`Found dog: ${dog.dog_name} (${dog.registration_number})`);

    // 2. Generate REAL PDF using your existing function
    const pdfBytes = await generateCertificatePDF(dog); // Direct function call
    const pdfBuffer = Buffer.from(pdfBytes);
    const pdfFileName = `certificates/${dog.registration_number}.pdf`;

    // 3. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("wcu-dogs")
      .upload(pdfFileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading PDF:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // 4. Get public URL
    const { data: urlData } = supabase.storage
      .from("wcu-dogs")
      .getPublicUrl(pdfFileName);

    const pdfUrl = urlData.publicUrl;

    // 5. Update database record
    const { error: updateError } = await supabase
      .from("registrations")
      .update({
        pdf_url: pdfUrl,
        certificate_sent_at: new Date().toISOString(),
      })
      .eq("registration_number", wcuNumber);

    if (updateError) {
      console.error("Error updating database:", updateError);
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    console.log(`PDF regenerated successfully: ${pdfUrl}`);

    return {
      success: true,
      pdfUrl: pdfUrl,
      message: `PDF regenerated for ${dog.registration_number}`,
    };
  } catch (error) {
    console.error("PDF regeneration failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
