import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    console.log("🧪 Starting test registration...");

    // 1. Create a test registration
    const testId = "test-" + Date.now();
    const testRegistration = {
      id: testId,
      registration_number: "WCU-TEST" + Date.now().toString().slice(-4),
      dog_name: "Test Dog " + Date.now().toString().slice(-4),
      owner_name: "Test Owner",
      owner_email: "test@example.com",
      status: "pending",
      gender: "male",
      primary_breed: "Test Breed",
      dog_color: "Test Color",
      created_at: new Date().toISOString(),
    };

    console.log(
      "📝 Creating test registration:",
      testRegistration.registration_number
    );

    const { error: insertError } = await supabase
      .from("registrations")
      .insert([testRegistration]);

    if (insertError) {
      console.error("❌ Database insert error:", insertError);
      throw insertError;
    }

    console.log("✅ Test registration created:", testId);

    // 2. Call your webhook handler directly
    const mockSession = {
      id: "cs_test_" + Date.now(),
      metadata: { registration_id: testId },
      customer: "cus_test123",
      customer_details: {
        email: testRegistration.owner_email,
        name: testRegistration.owner_name,
      },
      payment_intent: "pi_test123",
      payment_status: "paid",
    };

    console.log("🔄 Calling webhook handler with mock session...");

    // Import and run your webhook handler
    const { handleCheckoutSessionCompleted } =
      await import("../webhooks/stripe/route");
    await handleCheckoutSessionCompleted(mockSession as any);

    console.log("🎉 Test completed successfully!");

    return NextResponse.json({
      success: true,
      message: "Test registration created and processed",
      registration: testRegistration,
      testId: testId,
    });
  } catch (error: any) {
    console.error("❌ Test error:", error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
