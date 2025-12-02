"use server";

import { supabase } from "@/lib/supabase";
import { generateCertificate } from "@/lib/pdf-generator";

interface FormData {
  dogName: string;
  gender: string;
  birthDate: string;
  gotchaDay: string;
  primaryBreed: string;
  secondaryBreed: string;
  tertiaryBreed: string;
  dogDescription: string;
  specialAttributes: string;
  favoriteActivities: string;
  uniqueTraits: string;
  dogStory: string;
  shelterName: string;
  shelterCity: string;
  shelterState: string;
  shelterWebsite: string;
  rescueLocation: string;
  ownerName: string;
  ownerEmail: string;
}

export async function submitRegistration(
  formData: FormData,
  selectedImage: File | null
) {
  try {
    // Check for existing registration
    const { data: existingRegistration, error: checkError } = await supabase
      .from("registrations")
      .select("id")
      .eq("owner_email", formData.ownerEmail)
      .eq("dog_name", formData.dogName)
      .maybeSingle();

    if (checkError) {
      // Handle multiple rows as duplicate
      if (checkError.message.includes("multiple")) {
        return {
          success: false,
          error: "A registration already exists for this email and dog name.",
        };
      }
      return {
        success: false,
        error: "System error checking registration. Please try again.",
      };
    }

    if (existingRegistration) {
      return {
        success: false,
        error: "A registration already exists for this email and dog name.",
      };
    }

    // Create registration
    const { data: registrationData, error: registrationError } = await supabase
      .from("registrations")
      .insert([
        {
          dog_name: formData.dogName,
          owner_name: formData.ownerName,
          owner_email: formData.ownerEmail,
          birth_date: formData.birthDate || null,
          gotcha_date: formData.gotchaDay || null,
          location: formData.rescueLocation || null,
          breed_description: `${formData.primaryBreed} ${
            formData.secondaryBreed ? `+ ${formData.secondaryBreed}` : ""
          } ${
            formData.tertiaryBreed ? `+ ${formData.tertiaryBreed}` : ""
          }`.trim(),
          rescue_story: formData.dogStory,
          dog_description: formData.dogDescription || null,
          special_attributes: formData.specialAttributes || null,
          favorite_activities: formData.favoriteActivities || null,
          unique_traits: formData.uniqueTraits || null,
          shelter_name: formData.shelterName || null,
          shelter_city: formData.shelterCity || null,
          shelter_state: formData.shelterState || null,
          shelter_website: formData.shelterWebsite || null,
          status: "pending",
        },
      ])
      .select();

    if (registrationError) {
      return {
        success: false,
        error: "Registration failed. Please try again.",
      };
    }

    const registration = registrationData[0];
    const registrationNumber = registration.registration_number;

    // ADD PDF GENERATION HERE - right after getting registration number

    try {
      const pdfBytes = await generateCertificate(registration);

      // Convert to base64 for storage
      const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

      // Store PDF in database
      const { error: pdfUpdateError } = await supabase
        .from("registrations")
        .update({
          pdf_certificate: pdfBase64,
          certificate_generated_at: new Date().toISOString(),
        })
        .eq("id", registration.id);

      if (pdfUpdateError) {
        console.error("Failed to save PDF:", pdfUpdateError);
        // Don't throw - registration succeeded, just PDF save failed
      }
    } catch (pdfError) {
      console.error("PDF generation failed:", pdfError);
      // Don't throw - registration succeeded, just PDF failed
    }

    // Upload image if provided
    if (selectedImage) {
      const fileExt = selectedImage.name.split(".").pop();
      const fileName = `${registrationNumber}-photo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("wcu-dogs")
        .upload(`dog-photos/${fileName}`, selectedImage);

      if (uploadError) {
        return {
          success: false,
          error: "Failed to upload photo. Registration created without image.",
        };
      }

      const { data: publicUrlData } = supabase.storage
        .from("wcu-dogs")
        .getPublicUrl(`dog-photos/${fileName}`);

      const { error: updateError } = await supabase
        .from("registrations")
        .update({ photo_url: publicUrlData.publicUrl })
        .eq("id", registration.id);

      if (updateError) {
        // Non-critical error - registration succeeded but photo link failed
        console.error("Failed to update photo URL:", updateError);
      }
    }

    return {
      success: true,
      registrationNumber,
      message: `🎉 Registration Successful! Your official WCU number: ${registrationNumber}`,
    };
  } catch (error) {
    return {
      success: false,
      error: "Registration failed. Please try again.",
    };
  }
}
