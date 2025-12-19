"use server";

import { supabase } from "@/lib/supabase";
import { createStripeCheckoutSession } from "@/lib/stripe";

// Get base URL safely
const getBaseUrl = () => {
  // Try environment variable first
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Fallback for Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback for local development
  return "http://localhost:3000";
};

const BASE_URL = getBaseUrl();

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
    // ========== SERVER-SIDE VALIDATION ==========
    const requiredFields = [
      "dogName",
      "gender",
      "gotchaDay",
      "primaryBreed",
      "dogColor",
      "ownerName",
      "ownerEmail",
    ] as const;

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.map((f) => f.replace(/([A-Z])/g, " $1").toLowerCase()).join(", ")}`,
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.ownerEmail)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }
    // ========== END VALIDATION ==========

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
          gender: formData.gender,
          gotcha_date: formData.gotchaDay,
          location: formData.rescueLocation || null,
          breed_description: `${formData.primaryBreed} ${
            formData.secondaryBreed ? `+ ${formData.secondaryBreed}` : ""
          } ${
            formData.tertiaryBreed ? `+ ${formData.tertiaryBreed}` : ""
          }`.trim(),
          dog_color: formData.dogColor,
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
      console.error("🚨 DATABASE INSERT FAILED:", registrationError);
      return {
        success: false,
        error:
          "Registration system is temporarily unavailable. Please try again in a few minutes.",
      };
    }

    const registration = registrationData[0];
    const registrationNumber = registration.registration_number;

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
        baseUrl: BASE_URL,
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
