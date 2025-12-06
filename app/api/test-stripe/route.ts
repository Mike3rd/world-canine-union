import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function GET() {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1Sb5xSRtExzmzHmhrWQRWrfQ", // Your price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      message: "Stripe checkout created",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
