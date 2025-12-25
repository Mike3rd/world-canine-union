// src/hooks/useSpotlightDogs.ts
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface SpotlightDog {
  id: string;
  registration_number: string;
  dog_name: string;
  breed_description: string;
  rescue_story: string;
  photo_url: string | null;
  shelter_name: string | null;
  shelter_city: string | null;
  shelter_state: string | null;
  spotlight_reason: string | null;
  spotlight_expires_at: string | null;
  spotlight_order: number;
  created_at: string;
  is_spotlight_active: boolean;
}

interface FallbackDog {
  id: string;
  registration_number: string;
  dog_name: string;
  breed_description: string;
  rescue_story: string;
  photo_url: string | null;
  shelter_name: string | null;
  shelter_city: string | null;
  shelter_state: string | null;
  spotlight_reason: string | null;
  spotlight_expires_at: string | null;
  spotlight_order: number;
  created_at: string;
}

export function useSpotlightDogs(limit: number = 3) {
  const [dogs, setDogs] = useState<SpotlightDog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpotlightDogs();
  }, [limit]);

  async function fetchSpotlightDogs() {
    try {
      setLoading(true);
      setError(null);

      // Try the view first
      const { data, error: viewError } = await supabase
        .from("spotlight_dogs_view")
        .select("*")
        .limit(limit);

      if (viewError) {
        console.warn("View failed, using fallback:", viewError);
        await fetchSpotlightDogsFallback();
        return;
      }

      setDogs(data || []);
    } catch (err: unknown) {
      console.error("Error fetching spotlight dogs:", err);
      setError("Failed to load spotlight dogs");
      setDogs([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSpotlightDogsFallback() {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select(
          `
          id,
          registration_number,
          dog_name,
          breed_description,
          rescue_story,
          photo_url,
          shelter_name,
          shelter_city,
          shelter_state,
          spotlight_reason,
          spotlight_expires_at,
          spotlight_order,
          created_at
        `
        )
        .eq("is_spotlight", true)
        .eq("status", "completed")
        .or("spotlight_expires_at.is.null,spotlight_expires_at.gt.NOW()")
        .order("spotlight_order", { ascending: true, nullsFirst: true })
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Cast to FallbackDog array
      const fallbackData = data as FallbackDog[] | null;

      // Add active status manually with proper typing
      const dogsWithActiveStatus: SpotlightDog[] = (fallbackData || []).map(
        (dog: FallbackDog) => ({
          ...dog,
          is_spotlight_active: true,
        })
      );

      setDogs(dogsWithActiveStatus);
    } catch (err: unknown) {
      console.error("Error in fallback fetch:", err);
      setError("Failed to load spotlight dogs");
      setDogs([]);
    }
  }

  return { dogs, loading, error, refetch: fetchSpotlightDogs };
}
