// src/components/CommunityStats.tsx - SIMPLIFIED
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import StatsDashboard from "./StatsDashboard";
import ShelterList from "./ShelterList";

interface ImpactStats {
    total_dogs: number;
    total_donations: number;
    rescue_partners: number;
    states_represented: number;
    last_updated: string;
}

interface ShelterStats {
    shelter_name: string;
    shelter_city: string | null;
    shelter_state: string | null;
    shelter_website: string | null;
    dog_count: number;
}

interface Registration {
    shelter_name?: string | null;
    shelter_state?: string | null;
}

interface ShelterRegistration {
    shelter_name?: string | null;
    shelter_city?: string | null;
    shelter_state?: string | null;
    shelter_website?: string | null;
}

export default function CommunityStats() {
    const [stats, setStats] = useState<ImpactStats | null>(null);
    const [topShelters, setTopShelters] = useState<ShelterStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImpactData();
    }, []);

    async function fetchImpactData() {
        try {
            setLoading(true);

            // Get stats from homepage_stats or calculate
            const { data: statsData, error: statsError } = await supabase
                .from("homepage_stats")
                .select("*")
                .single();

            if (statsError) {
                // Calculate manually
                const { count: totalDogs } = await supabase
                    .from("registrations")
                    .select("*", { count: "exact", head: true })
                    .eq("status", "completed");

                const { data: shelterRegistrations } = await supabase
                    .from("registrations")
                    .select("shelter_name")
                    .not("shelter_name", "is", null);

                const { data: stateRegistrations } = await supabase
                    .from("registrations")
                    .select("shelter_state")
                    .not("shelter_state", "is", null);

                // Type-safe filtering
                const shelterNames = shelterRegistrations?.map((r: Registration) => r.shelter_name?.trim().toLowerCase()) || [];
                const uniqueShelters = new Set(shelterNames.filter((name: string | undefined) => name && name !== ""));

                const states = stateRegistrations?.map((r: Registration) => r.shelter_state?.trim().toLowerCase()) || [];
                const uniqueStates = new Set(states.filter((state: string | undefined) => state && state !== ""));

                setStats({
                    total_dogs: totalDogs || 0,
                    total_donations: (totalDogs || 0) * 5,
                    rescue_partners: uniqueShelters.size,
                    states_represented: uniqueStates.size,
                    last_updated: new Date().toISOString()
                });
            } else {
                setStats(statsData);
            }

            // Fetch FEATURED shelters with website and count dogs
            const { data: featuredShelters, error: featuredError } = await supabase
                .from("registrations")
                .select("shelter_name, shelter_city, shelter_state, shelter_website")
                .eq("shelter_featured", true)
                .not("shelter_name", "is", null)
                .order("shelter_featured_order", { ascending: true });

            if (!featuredError && featuredShelters && featuredShelters.length > 0) {
                // Count ACTUAL dogs per featured shelter
                const shelterCounts: Record<string, ShelterStats> = {};

                for (const shelter of featuredShelters) {
                    const key = shelter.shelter_name || 'unknown';
                    if (!shelterCounts[key]) {
                        // Get count for this shelter
                        const { count } = await supabase
                            .from("registrations")
                            .select("*", { count: "exact", head: true })
                            .eq("shelter_name", shelter.shelter_name)
                            .eq("status", "completed");

                        shelterCounts[key] = {
                            shelter_name: shelter.shelter_name || 'Unknown Shelter',
                            shelter_city: shelter.shelter_city || null,
                            shelter_state: shelter.shelter_state || null,
                            shelter_website: shelter.shelter_website || null,
                            dog_count: count || 0
                        };
                    }
                }

                // Convert to array and limit to 5
                const featuredResults = Object.values(shelterCounts).slice(0, 5);
                setTopShelters(featuredResults);
            } else {
                // Fallback: Calculate top shelters manually
                const { data: allShelters } = await supabase
                    .from("registrations")
                    .select("shelter_name, shelter_city, shelter_state, shelter_website")
                    .not("shelter_name", "is", null);

                if (allShelters && allShelters.length > 0) {
                    const shelterCounts: Record<string, ShelterStats> = {};

                    allShelters.forEach((reg: ShelterRegistration) => {
                        const key = reg.shelter_name?.trim().toLowerCase() || 'unknown';
                        if (!shelterCounts[key]) {
                            shelterCounts[key] = {
                                shelter_name: reg.shelter_name || 'Unknown Shelter',
                                shelter_city: reg.shelter_city || null,
                                shelter_state: reg.shelter_state || null,
                                shelter_website: reg.shelter_website || null,
                                dog_count: 0
                            };
                        }
                        shelterCounts[key].dog_count++;
                    });

                    const manualResults = Object.values(shelterCounts)
                        .sort((a, b) => b.dog_count - a.dog_count)
                        .slice(0, 5);

                    setTopShelters(manualResults);
                } else {
                    setTopShelters([]);
                }
            }

        } catch (error) {
            console.error("Error fetching impact data:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="h-64 bg-gray-100 rounded-2xl"></div>
                            <div className="h-64 bg-gray-100 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-3 mb-26">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* <StatsDashboard stats={stats} />
                    <ShelterList shelters={topShelters} /> */}
                </div>
            </div>
        </section>
    );
}