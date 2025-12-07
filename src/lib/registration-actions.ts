"use server";

import { supabase } from "@/lib/supabase";
import { createStripeCheckoutSession } from "@/lib/stripe";

interface FormData {
  dogName: string;
  gender: string;
  birthDate: string;
  gotchaDay: string;
  primaryBreed: string;
  secondaryBreed: string;
  tertiaryBreed: string;
  dogColor: string;
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
          dog_color: formData.dogColor || null,
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
    /*
    // ===== PDF GENERATION WITH DEBUGGING =====
    console.log("📄 Starting PDF generation for:", registrationNumber);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "https://www.worldcanineunion.org/";
      console.log("📞 Calling API:", `${baseUrl}/api/generate-certificate`);

      const response = await fetch(`${baseUrl}/api/generate-certificate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registration_number: registrationNumber,
        }),
      });

      console.log(
        "📊 API Response Status:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ PDF API Error:", errorText);
        // STILL CONTINUE - don't throw, just log
      } else {
        const pdfBlob = await response.blob();
        console.log("✅ PDF Blob Size:", pdfBlob.size, "bytes");

        // Convert to base64
        const pdfBuffer = await pdfBlob.arrayBuffer();
        const pdfBytes = new Uint8Array(pdfBuffer);
        const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
        console.log("📊 Base64 Length:", pdfBase64.length, "chars");

        // Try to store in Supabase Storage
        let pdfUrl = "";
        try {
          const fileName = `certificates/${registrationNumber}.pdf`;
          console.log("💾 Attempting storage upload...");

          const { error: uploadError } = await supabase.storage
            .from("wcu-dogs")
            .upload(fileName, pdfBlob, {
              contentType: "application/pdf",
              upsert: true,
            });

          if (uploadError) {
            console.warn("⚠️ Storage upload failed:", uploadError.message);
          } else {
            const { data: urlData } = supabase.storage
              .from("wcu-dogs")
              .getPublicUrl(fileName);
            pdfUrl = urlData.publicUrl;
            console.log("✅ PDF stored at:", pdfUrl);
          }
        } catch (storageError) {
          console.warn("⚠️ Storage error:", storageError);
        }

        // Save to database
        console.log("💾 Saving to database...");
        const { error: pdfUpdateError } = await supabase
          .from("registrations")
          .update({
            pdf_url: pdfUrl || null,
            pdf_certificate: pdfBase64,
            certificate_generated_at: new Date().toISOString(),
          })
          .eq("id", registration.id);

        if (pdfUpdateError) {
          console.error("❌ Database update failed:", pdfUpdateError);
        } else {
          console.log("✅ PDF saved to database successfully!");
        }
      }
    } catch (error) {
      console.error("💥 PDF generation crashed:", error);
    }
    // ===== END PDF GENERATION =====
  */

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

    // SATURDAY ⭐ CREATE STRIPE CHECKOUT SESSION
    try {
      const checkoutSession = await createStripeCheckoutSession({
        registrationId: registration.id,
        customerEmail: formData.ownerEmail,
        dogName: formData.dogName,
      });

      // ⭐ SAVE SESSION ID TO DATABASE
      await supabase
        .from("registrations")
        .update({
          stripe_checkout_session_id: checkoutSession.id,
          payment_status: "pending",
        })
        .eq("id", registration.id);

      console.log("✅ Stripe checkout created:", checkoutSession.id);

      // ⭐ RETURN CHECKOUT URL WITH MESSAGE
      return {
        success: true,
        message: `🎉 Registration submitted! Your WCU number: ${registrationNumber}. Redirecting to payment...`,
        checkoutUrl: checkoutSession.url,
        registrationNumber: registrationNumber,
      };
    } catch (stripeError) {
      console.error("❌ Stripe checkout failed:", stripeError);
      // Continue without Stripe for now (fallback)
    }
    // ⭐ END SATURDAY

    return {
      success: true,
      checkoutUrl: null, // No payment link
      registrationNumber: registrationNumber,
      message: `🎉 Registration Successful! Your official WCU number: ${registrationNumber}`,
    };
  } catch (error) {
    return {
      success: false,
      error: "Registration failed. Please try again.",
    };
  }
}
