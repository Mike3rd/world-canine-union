// app/api/test-all-fields/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const testData = {
    registration_number: "WCU-TEST-ALL2",
    dog_name: "Test Dog Complete",
    owner_name: "Test Owner",
    owner_email: "test@example.com",
    gender: "female",
    gotcha_date: "2023-01-01",
    breed_description: "Mixed Breed",
    dog_color: "Brown and white",
    status: "completed",

    // Add a few optional fields to test
    birth_date: "2021-05-15",
    rescue_story: "Test rescue story",
    dog_description: "Medium size, friendly",
    special_attributes: "Very smart",
    favorite_activities: "Fetch",
    unique_traits: "Likes to sleep",
    shelter_name: "Test Shelter",
    shelter_city: "Test City",
    shelter_state: "TS",
    shelter_website: "testwebsite.com",

    // Minimal payment data
    stripe_payment_id: "test_payment_123",
    payment_status: "pending",
  };

  try {
    const { data, error } = await supabase
      .from("registrations")
      .insert(testData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        status: "ERROR",
        message: "Insert failed",
        error: error.message,
        hint: "Check if all columns exist",
      });
    }

    return NextResponse.json({
      status: "SUCCESS",
      message: "All fields work!",
      inserted_data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: "ERROR",
      message: "Test failed",
      error: String(error),
    });
  }
}
