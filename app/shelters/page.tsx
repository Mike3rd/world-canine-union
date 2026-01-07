"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Star } from "lucide-react";
import Link from "next/link";
import ShelterCard from "./ShelterCard";
import SearchFilters from "./SearchFilters";
import LoadingGrid from "./LoadingGrid";

interface ShelterData {
  shelter_name: string;
  shelter_city: string | null;
  shelter_state: string | null;
  shelter_website: string | null;
  dog_count: number;
  shelter_featured?: boolean;
}

export default function SheltersPage() {
  const [loading, setLoading] = useState(true);
  const [shelters, setShelters] = useState<ShelterData[]>([]);
  const [filteredShelters, setFilteredShelters] = useState<ShelterData[]>([]);
  const [spotlightShelters, setSpotlightShelters] = useState<ShelterData[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    fetchSheltersData();
  }, []);

  useEffect(() => {
    if (searchPerformed && selectedState) {
      filterShelters();
    }
  }, [selectedState, shelters, searchPerformed]);

  async function fetchSheltersData() {
    try {
      setLoading(true);

      // Fetch shelters from registrations - include shelter_featured column
      const { data: sheltersData, error } = await supabase
        .from("registrations")
        .select("registration_number, shelter_name, shelter_city, shelter_state, shelter_website, shelter_featured")
        .not("shelter_name", "is", null)
        .eq("status", "completed");

      if (error) {
        console.error("Error fetching shelters:", error);
        return;
      }

      const shelterMap = new Map<string, ShelterData>();

      for (const shelter of sheltersData) {
        const key = `${shelter.shelter_name}|${shelter.shelter_state}`;

        if (!shelterMap.has(key)) {
          // Count ALL dogs for this shelter (not just featured ones)
          const { count } = await supabase
            .from("registrations")
            .select("*", { count: "exact", head: true })
            .eq("shelter_name", shelter.shelter_name)
            .eq("shelter_state", shelter.shelter_state)
            .eq("status", "completed");

          shelterMap.set(key, {
            shelter_name: shelter.shelter_name,
            shelter_city: shelter.shelter_city,
            shelter_state: shelter.shelter_state,
            shelter_website: shelter.shelter_website,
            dog_count: count || 0,
            shelter_featured: shelter.shelter_featured || false  // Add this field
          });
        }
      }

      const allShelters = Array.from(shelterMap.values());

      // Identify spotlight shelters - those with shelter_featured = true
      const spotlight = allShelters.filter(shelter => shelter.shelter_featured === true);

      // Get non-featured shelters
      const nonSpotlight = allShelters.filter(shelter => !shelter.shelter_featured);

      setShelters(allShelters);
      setSpotlightShelters(spotlight); // These are now shelters with shelter_featured = true
      setFilteredShelters([]);

    } catch (error) {
      console.error("Error fetching shelters data:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterShelters() {
    if (selectedState) {
      const filtered = shelters.filter(shelter =>
        shelter.shelter_state &&
        shelter.shelter_state.toLowerCase() === selectedState
      );
      setFilteredShelters(filtered);
    } else {
      setFilteredShelters([]);
    }
  }

  const handleSearch = () => {
    if (selectedState) {
      setSearchPerformed(true);
      filterShelters();
    }
  };

  const handleClearSearch = () => {
    setSelectedState("");
    setFilteredShelters([]);
    setSearchPerformed(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Shelter & Rescue Directory
          </h1>
          <p className="text-xl text-text-muted font-body2">
            Discover amazing organizations saving dogs across the nation
          </p>
        </div>

        {/* Loading State */}
        {loading && <LoadingGrid />}

        {/* ===== 1. SPOTLIGHT SHELTERS ===== */}
        {!loading && spotlightShelters.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-accent fill-accent" />
              <h2 className="text-2xl font-heading font-semibold text-primary">
                Spotlight Shelters
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {spotlightShelters.map((shelter, index) => (
                <ShelterCard
                  key={`spotlight-${index}`}
                  shelter={shelter}
                />
              ))}
            </div>
          </div>
        )}

        {/* ===== 2. SEARCH BAR ===== */}
        {!loading && (
          <div className="mb-12">
            <div className="bg-surface rounded-2xl p-6 shadow-lg border border-border mb-8">
              <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
                Find Shelters in Your State
              </h2>
              <SearchFilters
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                onSearch={handleSearch}
              />
            </div>
          </div>
        )}

        {/* ===== 3. SEARCH RESULTS AREA ===== */}
        {!loading && searchPerformed && (
          <div className="mb-12">
            {/* Search Results Header */}
            {filteredShelters.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-2xl font-heading font-semibold text-primary">
                    Shelters in {selectedState.toUpperCase()}
                  </h2>
                  <button
                    onClick={handleClearSearch}
                    className="text-sm text-text-muted hover:text-accent"
                  >
                    Clear search
                  </button>
                </div>

                {/* Search Results List */}
                <div className="space-y-2 sm:space-y-3">
                  {filteredShelters.map((shelter, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-2 sm:px-4 hover:bg-primary/5 rounded-lg transition-colors border-b border-border last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-text text-sm sm:text-base">
                          {shelter.shelter_name}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-muted">
                          {shelter.shelter_city && `${shelter.shelter_city}, `}
                          {shelter.shelter_state}
                          {shelter.dog_count > 0 && (
                            <span className="ml-2 sm:ml-3 text-accent">
                              • {shelter.dog_count} registered
                            </span>
                          )}
                        </p>
                      </div>
                      {shelter.shelter_website && (
                        <a
                          href={shelter.shelter_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-accent hover:underline whitespace-nowrap mt-1 sm:mt-0"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* No Results Message */
              <div className="text-center py-12 bg-surface rounded-2xl border border-border">
                <p className="text-xl text-text-muted mb-4 pl-2 pr-2">
                  No shelters found in {selectedState.toUpperCase()}. Be the first to register from this state!
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleClearSearch}
                    className="bg-buttons text-surface px-6 py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition-all"
                  >
                    Try another state
                  </button>
                  <p className="text-sm text-text-muted">
                    Or <Link href="/register" className="text-accent hover:underline">register your dog</Link> to add a shelter
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Data - No shelters at all in database */}
        {!loading && shelters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-text-muted mb-4">
              No shelters registered yet. When you register a rescue dog, their shelter will appear here!
            </p>
            <Link
              href="/register"
              className="bg-buttons text-surface px-6 py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition-all inline-block"
            >
              Register Your Dog
            </Link>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-surface rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
              Is your shelter missing?
            </h2>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              When you register your rescue dog with World Canine Union, your
              shelter automatically gets added to our directory. Help us
              recognize the amazing work they do!
            </p>
            <Link
              href="/register"
              className="bg-buttons text-surface px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 transition-all inline-block"
            >
              Register Your Dog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}