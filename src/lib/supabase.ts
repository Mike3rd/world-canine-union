// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a mock client for development when env vars are missing
const createSupabaseClient = () => {
  if (supabaseUrl && supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  console.warn(
    "Supabase environment variables are missing. Using mock client."
  );

  // Return a mock client that won't crash your app
  return {
    from: () => ({
      insert: () => ({
        select: () =>
          Promise.resolve({
            data: null,
            error: new Error("Supabase not configured"),
          }),
      }),
    }),
    storage: {
      from: () => ({
        upload: () =>
          Promise.resolve({
            data: null,
            error: new Error("Supabase not configured"),
          }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  } as any;
};

export const supabase = createSupabaseClient();
