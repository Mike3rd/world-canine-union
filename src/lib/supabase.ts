// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Safe environment variable access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we're in a browser environment where env vars are available
const isBrowser = typeof window !== "undefined";

if (!supabaseUrl && isBrowser) {
  console.error("Supabase URL is missing. Check your environment variables.");
}

if (!supabaseAnonKey && isBrowser) {
  console.error(
    "Supabase Anon Key is missing. Check your environment variables."
  );
}

// Only create the client if we have the required values
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : ({} as any); // Fallback for build time
