// src/components/CommunityStatsCombined.tsx - FIXED VERSION
"use client";

import { useState, useEffect } from "react";
import { Users, Heart, Home, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface StatsData {
    total_dogs: number;
    total_donations: number;
    rescue_partners: number;
    states_represented: number;
    last_updated?: string;
}

interface ShelterData {
    shelter_name: string;
    shelter_city: string | null;
    shelter_state: string | null;
    shelter_website: string | null;
    dog_count?: number;
}

export default function CommunityStatsCombined() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<StatsData | null>(null);
    const [shelters, setShelters] = useState<ShelterData[]>([]);

    useEffect(() => {
        fetchAllData();
    }, []);

    async function fetchAllData() {
        try {
            setLoading(true);

            // 1. FETCH STATS (use your existing logic)
            const { data: statsData, error: statsError } = await supabase
                .from("homepage_stats")
                .select("*")
                .single();

            if (statsError) {
                // Calculate manually if no homepage_stats table
                const { count: totalDogs } = await supabase
                    .from("registrations")
                    .select("*", { count: "exact", head: true })
                    .eq("status", "completed");

                const statsCalculated = {
                    total_dogs: totalDogs || 0,
                    total_donations: (totalDogs || 0) * 5, // $5 per registration
                    rescue_partners: 25, // Adjust based on your data
                    states_represented: 42, // Adjust based on your data
                    last_updated: new Date().toISOString()
                };
                setStats(statsCalculated);
            } else {
                setStats(statsData);
            }

            // 2. FETCH SHELTERS (use your existing logic)
            const { data: sheltersData, error: sheltersError } = await supabase
                .from("registrations")
                .select("shelter_name, shelter_city, shelter_state, shelter_website")
                .not("shelter_name", "is", null)
                .limit(5);

            if (!sheltersError && sheltersData) {
                // Count dogs per shelter
                const sheltersWithCounts = await Promise.all(
                    sheltersData.map(async (shelter) => {
                        const { count } = await supabase
                            .from("registrations")
                            .select("*", { count: "exact", head: true })
                            .eq("shelter_name", shelter.shelter_name)
                            .eq("status", "completed");

                        return {
                            ...shelter,
                            dog_count: count || 0
                        };
                    })
                );
                setShelters(sheltersWithCounts);
            } else {
                setShelters([]);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    // ========== LOADING STATE ==========
    if (loading) {
        return (
            <section className="py-8 md:py-12 mb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
                        {/* LEFT COLUMN SKELETON - STATS */}
                        <div className="w-full lg:w-1/2 bg-surface p-6 md:p-8 rounded-2xl border border-border">
                            <div className="h-8 bg-gray-200 rounded w-2/3 mb-6 animate-pulse mx-auto lg:mx-0"></div>
                            <div className="space-y-4 md:space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
                                        </div>
                                        <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN SKELETON - SHELTERS */}
                        <div className="w-full lg:w-1/2 bg-surface p-6 md:p-8 rounded-2xl border border-border">
                            <div className="h-8 bg-gray-200 rounded w-2/3 mb-6 animate-pulse mx-auto lg:mx-0"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ========== LOADED STATE ==========
    return (
        <section className="py-8 md:py-12 mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-6 md:gap-8">
                    {/* ===== LEFT COLUMN: STATS ===== */}
                    <div className="w-full lg:w-1/2 bg-surface p-6 md:p-8 rounded-2xl border border-border hover:shadow-lg transition-all flex flex-col">
                        <h3 className="font-heading text-xl md:text-2xl font-semibold text-primary mb-6 text-center lg:text-left">
                            Our Community by the Numbers
                        </h3>

                        <div className="space-y-4 md:space-y-6 flex-1">
                            {/* 1. Dogs Registered */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-primary/5 rounded-lg gap-3 sm:gap-0">
                                <div className="flex items-center gap-3 justify-center sm:justify-start">
                                    <Users className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" />
                                    <span className="font-medium text-text text-sm md:text-base text-center sm:text-left">
                                        Dogs Registered
                                    </span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-primary text-center sm:text-right">
                                    {stats?.total_dogs?.toLocaleString() || "0"}
                                </span>
                            </div>

                            {/* 2. Total Donated */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-accent/5 rounded-lg gap-3 sm:gap-0">
                                <div className="flex items-center gap-3 justify-center sm:justify-start">
                                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-accent flex-shrink-0" />
                                    <span className="font-medium text-text text-sm md:text-base text-center sm:text-left">
                                        Total Donated
                                    </span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-accent text-center sm:text-right">
                                    ${stats?.total_donations?.toLocaleString() || "0"}
                                </span>
                            </div>

                            {/* 3. Rescue Partners */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-green-500/5 rounded-lg gap-3 sm:gap-0">
                                <div className="flex items-center gap-3 justify-center sm:justify-start">
                                    <Home className="w-6 h-6 md:w-8 md:h-8 text-green-600 flex-shrink-0" />
                                    <span className="font-medium text-text text-sm md:text-base text-center sm:text-left">
                                        Rescue Partners
                                    </span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-green-600 text-center sm:text-right">
                                    {stats?.rescue_partners || "0"}
                                </span>
                            </div>

                            {/* 4. States Represented */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-purple-500/5 rounded-lg gap-3 sm:gap-0">
                                <div className="flex items-center gap-3 justify-center sm:justify-start">
                                    <MapPin className="w-6 h-6 md:w-8 md:h-8 text-purple-600 flex-shrink-0" />
                                    <span className="font-medium text-text text-sm md:text-base text-center sm:text-left">
                                        States Represented
                                    </span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-purple-600 text-center sm:text-right">
                                    {stats?.states_represented || "0"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN: SHELTERS ===== */}
                    <div className="w-full lg:w-1/2 bg-surface p-6 md:p-8 rounded-2xl border border-border hover:shadow-lg transition-all flex flex-col">
                        <h3 className="font-heading text-xl md:text-2xl font-semibold text-primary mb-6 text-center lg:text-left">
                            Rescue Partners
                        </h3>

                        <div className="space-y-4 flex-1">
                            {shelters.map((shelter, index) => {
                                const locationParts = [];
                                if (shelter.shelter_city) locationParts.push(shelter.shelter_city);
                                if (shelter.shelter_state) locationParts.push(shelter.shelter_state);
                                const location = locationParts.join(", ") || "Location not specified";

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 border rounded-lg hover:bg-primary/5 transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                                            <span className="text-primary font-bold">🏠</span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate text-sm md:text-base">
                                                {shelter.shelter_name}
                                            </h4>
                                            <p className="text-xs md:text-sm text-text-muted">{location}</p>
                                            {shelter.dog_count && shelter.dog_count > 0 && (
                                                <p className="text-xs text-accent mt-1">
                                                    {shelter.dog_count} dog{shelter.dog_count !== 1 ? 's' : ''} registered
                                                </p>
                                            )}
                                        </div>

                                        {shelter.shelter_website && (
                                            <a
                                                href={shelter.shelter_website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-accent hover:underline whitespace-nowrap flex-shrink-0"
                                            >
                                                Visit →
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer link - Centered on mobile, left on desktop */}
                        <div className="mt-6 text-center lg:text-left">
                            <Link
                                href="/shelters"
                                className="text-accent hover:underline font-medium text-sm md:text-base"
                            >
                                View all rescue partners →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}