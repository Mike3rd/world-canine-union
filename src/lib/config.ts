// Central configuration for the entire app
export const config = {
  // Base URL for the app
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Certificate URLs - single source of truth
  getCertificateUrl: (wcuNumber: string): string => {
    return `${config.appUrl}/api/certificates/${wcuNumber}`;
  },

  // Supabase configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },

  // Stripe configuration
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    priceId: process.env.STRIPE_PRICE_ID || "",
  },
} as const;

// Optional: Validation for production
if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
  const required = [
    { key: "appUrl", value: config.appUrl },
    { key: "STRIPE_SECRET_KEY", value: config.stripe.secretKey },
    { key: "SUPABASE_URL", value: config.supabase.url },
  ];

  required.forEach(({ key, value }) => {
    if (!value) {
      throw new Error(`${key} is required in production`);
    }
  });
}
