"use server";

import { supabase } from "@/lib/supabase";

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
    // 1. Create the registration
    // Check for existing registration with same email and dog name
    const { data: existingRegistration, error: checkError } = await supabase
      .from("registrations")
      .select("id")
      .eq("owner_email", formData.ownerEmail)
      .eq("dog_name", formData.dogName)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking for existing registration:", checkError);
      throw checkError;
    }

    if (existingRegistration) {
      return {
        success: false,
        error:
          "A registration already exists for this email address and dog name. Each dog can only be registered once per owner.",
      };
    }
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
      console.error("Database insert error:", registrationError);
      throw registrationError;
    }

    const registration = registrationData[0];
    const registrationNumber = registration.registration_number;

    // 2. Upload image if exists
    let photoUrl = "";
    if (selectedImage) {
      const fileExt = selectedImage.name.split(".").pop();
      const fileName = `${registrationNumber}-photo.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("wcu-dogs")
        .upload(`dog-photos/${fileName}`, selectedImage);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("wcu-dogs")
        .getPublicUrl(`dog-photos/${fileName}`);

      photoUrl = publicUrlData.publicUrl;

      // 3. Update registration with photo URL
      const { error: updateError } = await supabase
        .from("registrations")
        .update({ photo_url: photoUrl })
        .eq("id", registration.id);

      if (updateError) throw updateError;
    }

    // Return success data instead of using alert
    return {
      success: true,
      registrationNumber,
      message: `🎉 Registration Successful! Your official WCU number: ${registrationNumber}`,
    };
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      success: false,
      error: "Registration failed. Please try again.",
    };
  }
}
