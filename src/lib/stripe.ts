import Stripe from "stripe";

// Check for environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});

// ⚠️ IMPORTANT: You need to get this from Stripe dashboard
// Go to: Products > WCU Dog Registration > Look for "Price ID" or "API ID"

export const WCU_REGISTRATION_PRICE_ID = process.env.STRIPE_PRICE_ID!;

// Function to create checkout session
export async function createStripeCheckoutSession({
  registrationId,
  customerEmail,
  dogName,
}: {
  registrationId: string;
  customerEmail: string;
  dogName: string;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: customerEmail,
      line_items: [
        {
          price: WCU_REGISTRATION_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      client_reference_id: registrationId,
      metadata: {
        registration_id: registrationId,
        dog_name: dogName,
      },
      payment_intent_data: {
        metadata: {
          registration_id: registrationId,
        },
      },
    });

    return session;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw error;
  }
}
