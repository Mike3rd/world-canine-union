// src/components/CommunityStats.tsx - WITH FIXED TYPE ANNOTATIONS
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Users, Heart, Home } from "lucide-react";

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
    dog_count: number;
}

interface Registration {
    shelter_name?: string | null;
    shelter_state?: string | null;
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

                // Type-safe filtering with explicit types
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

            // Fetch top shelters
            const { data: shelterData, error: shelterError } = await supabase
                .from("shelter_stats")
                .select("*")
                .order("dog_count", { ascending: false })
                .limit(5);

            if (!shelterError && shelterData && shelterData.length > 0) {
                setTopShelters(shelterData);
            } else {
                // Calculate manually
                const { data: manualShelters } = await supabase
                    .from("registrations")
                    .select("shelter_name, shelter_city, shelter_state")
                    .not("shelter_name", "is", null);

                if (manualShelters && manualShelters.length > 0) {
                    const shelterCounts: Record<string, ShelterStats> = {};
                    manualShelters.forEach((reg: { shelter_name?: string | null; shelter_city?: string | null; shelter_state?: string | null }) => {
                        const key = reg.shelter_name?.trim().toLowerCase() || 'unknown';
                        if (!shelterCounts[key]) {
                            shelterCounts[key] = {
                                shelter_name: reg.shelter_name || 'Unknown Shelter',
                                shelter_city: reg.shelter_city || null,
                                shelter_state: reg.shelter_state || null,
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
            <div className="max-w-7xl mx-auto px-4 ">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Community Stats */}
                    <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
                        <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                            Our Community by the Numbers
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Users className="w-8 h-8 text-primary" />
                                    <span className="font-medium text-text">Dogs Registered</span>
                                </div>
                                <span className="text-2xl font-bold text-primary">
                                    {stats?.total_dogs?.toLocaleString() || "0"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Heart className="w-8 h-8 text-accent" />
                                    <span className="font-medium text-text">Total Donated</span>
                                </div>
                                <span className="text-2xl font-bold text-accent">
                                    ${stats?.total_donations?.toLocaleString() || "0"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-green-500/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Home className="w-8 h-8 text-green-600" />
                                    <span className="font-medium text-text">Rescue Partners</span>
                                </div>
                                <span className="text-2xl font-bold text-green-600">
                                    {stats?.rescue_partners || "0"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-purple-500/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Home className="w-8 h-8 text-purple-600" />
                                    <span className="font-medium text-text">States Represented</span>
                                </div>
                                <span className="text-2xl font-bold text-purple-600">
                                    {stats?.states_represented || "0"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Top Rescue Organizations */}
                    <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
                        <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                            Top Rescue Partners
                        </h3>
                        <div className="space-y-4">
                            {topShelters.length > 0 ? (
                                topShelters.map((shelter, index) => (
                                    <div
                                        key={`${shelter.shelter_name}-${index}`}
                                        className="flex items-center justify-between p-4 hover:bg-primary/5 rounded-lg transition-colors border-b border-border last:border-0"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-primary">#{index + 1}</span>
                                                <span className="font-medium text-text">{shelter.shelter_name}</span>
                                            </div>
                                            <p className="text-sm text-text-muted">
                                                {shelter.shelter_city && `${shelter.shelter_city}, `}{shelter.shelter_state}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-accent">{shelter.dog_count}</span>
                                            <p className="text-xs text-text-muted">dogs registered</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-text-muted">
                                    <p>No shelter data available yet</p>
                                    <p className="text-sm mt-2">Rescue partners will appear here as dogs are registered</p>
                                </div>
                            )}
                        </div>

                        {/* Search Rescues Link */}
                        <div className="mt-6 text-center">
                            <Link
                                href="/rescues"
                                className="text-accent hover:underline font-medium"
                            >
                                Search All Rescue Partners →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}