"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Dog, Heart, Syringe, Home, Users } from "lucide-react";

interface ImpactStats {
    total_dogs: number;
    total_donations: number;
    rescue_partners: number;
    states_represented: number;
    last_updated: string;
}

interface RecentRegistration {
    registration_number: string;
    dog_name: string;
    breed_description: string;
    shelter_name: string | null;
    created_at: string;
}

export default function ImpactDashboard() {
    const [stats, setStats] = useState<ImpactStats | null>(null);
    const [recentDogs, setRecentDogs] = useState<RecentRegistration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImpactData();
    }, []);

    async function fetchImpactData() {
        try {
            setLoading(true);

            // Try to fetch from materialized view first
            const { data: statsData, error: statsError } = await supabase
                .from("homepage_stats")
                .select("*")
                .single();

            if (statsError) {
                console.warn("Stats view not found, calculating manually...");
                // Fallback: Calculate manually
                const { data: registrations, count } = await supabase
                    .from("registrations")
                    .select("*", { count: "exact", head: true })
                    .eq("status", "completed");

                const { data: shelters } = await supabase
                    .from("registrations")
                    .select("shelter_name, shelter_state")
                    .eq("status", "completed");

                // WITH THIS:
                const shelterNames: string[] = [];
                const shelterStates: string[] = [];

                if (shelters) {
                    for (const shelter of shelters) {
                        if (shelter.shelter_name) shelterNames.push(shelter.shelter_name);
                        if (shelter.shelter_state) shelterStates.push(shelter.shelter_state);
                    }
                }

                const uniqueShelters = new Set(shelterNames);
                const uniqueStates = new Set(shelterStates);

                setStats({
                    total_dogs: count || 0,
                    total_donations: (count || 0) * 5, // ← $5 per registration (20% of $25)
                    rescue_partners: uniqueShelters.size,
                    states_represented: uniqueStates.size,
                    last_updated: new Date().toISOString()
                });

            } else {
                setStats(statsData);
            }

            // Fetch recent registrations (capped at 5)
            const { data: recentData, error: recentError } = await supabase
                .from("registrations")
                .select("registration_number, dog_name, breed_description, shelter_name, created_at")
                .eq("status", "completed")
                .order("created_at", { ascending: false })
                .limit(5);

            if (recentError) throw recentError;
            setRecentDogs(recentData || []);
        } catch (error) {
            console.error("Error fetching impact data:", error);
        } finally {
            setLoading(false);
        }
    }

    // Calculate impact PER REGISTRATION
    const calculateImpact = () => {
        if (!stats) return null;

        const registrations = stats.total_dogs || 0;
        const totalDonations = registrations * 5; // $5 per registration (not $25)

        return {
            dogsFed: Math.floor(totalDonations / 3.5), // $3.50 feeds 1 dog for several days
            vaccinesProvided: Math.floor(totalDonations / 10), // $10 per vaccine
            medicalTreatments: Math.floor(totalDonations / 40), // $40 per treatment
            spayNeuters: Math.floor(totalDonations / 60), // $60 per spay/neuter
        };
    };

    const impact = calculateImpact();

    if (loading) {
        return (
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-40 bg-gray-100 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 ">
            <div className="container max-w-7xl mx-auto px-4 ">
                {/* HEADER SECTION - Updated to introduce both */}
                <h2 className="text-4xl font-heading font-bold text-primary text-center mb-6">
                    Your Registration Makes a Difference
                </h2>

                <p className="text-xl font-body2 text-text-muted text-center mb-12 max-w-3xl mx-auto">
                    Every WCU registration includes a <strong>20% donation</strong> that directly supports rescue animals.
                    Here&apos;s how your support helps and what our community has accomplished together.
                </p>

                {/* REVISED IMPACT METRICS - NEW DESIGN */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {/* Dogs Fed - NEW DESIGN */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                                    <Dog className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                    3-4 Days
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Feeds Shelter Pets
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-amber-700">$5 from your fee</span> provides nutritious meals for shelter animals
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-amber-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full w-3/4"></div>
                                    </div>
                                    <span className="font-semibold text-amber-700">75% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vaccines Provided - NEW DESIGN */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                                    <Syringe className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Life-Saving
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Provides Vaccines
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-blue-700">Every 2 registrations</span> funds a complete vaccine for a rescue
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-blue-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-1.5 rounded-full w-1/2"></div>
                                    </div>
                                    <span className="font-semibold text-blue-700">50% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medical Treatments - NEW DESIGN */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Emergency Care
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Funds Medical Care
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-green-700">Every 8 registrations</span> provides emergency medical treatment
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-green-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full w-1/4"></div>
                                    </div>
                                    <span className="font-semibold text-green-700">25% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spay/Neuters - NEW DESIGN */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center">
                                    <Home className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                    Prevents Homelessness
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Supports Spay/Neuter
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-purple-700">Every 12 registrations</span> funds a spay/neuter surgery
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-purple-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-purple-400 to-violet-500 h-1.5 rounded-full w-1/5"></div>
                                    </div>
                                    <span className="font-semibold text-purple-700">20% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two-Column Layout: Stats + Recent Members */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
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

                    {/* Right Column: Recent Members */}
                    <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
                        <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                            Recent Members of Our Pack
                        </h3>
                        <div className="space-y-4">
                            {recentDogs.length > 0 ? (
                                recentDogs.map((dog) => (
                                    <div
                                        key={dog.registration_number}
                                        className="flex items-center justify-between p-4 hover:bg-primary/5 rounded-lg transition-colors border-b border-border last:border-0"
                                    >
                                        <div>
                                            <p className="font-medium text-text">
                                                <span className="text-primary font-bold">{dog.registration_number}</span>
                                                {" "}• {dog.dog_name}
                                            </p>
                                            <p className="text-sm text-text-muted">
                                                {dog.breed_description || "Mixed Breed"}
                                                {dog.shelter_name && ` • Rescued from ${dog.shelter_name}`}
                                            </p>
                                        </div>
                                        <div className="text-sm text-text-muted">
                                            {new Date(dog.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-text-muted">
                                    <p>Be the first to register your dog!</p>
                                    <p className="text-sm mt-2">Your dog could be featured here.</p>
                                </div>
                            )}
                        </div>

                        {/* View All Link */}
                        {recentDogs.length > 0 && (
                            <div className="mt-6 text-center">
                                <Link
                                    href="/registry"
                                    className="text-accent hover:underline font-medium"
                                >
                                    View All Registered Dogs →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center border-t border-border pt-12">
                    <p className="text-xl font-body2 text-text-muted mb-6 max-w-2xl mx-auto">
                        Ready to celebrate your dog and support rescue animals?
                        <span className="font-semibold text-accent block mt-2">
                            Join thousands of proud dog owners today:
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/register"
                            className="bg-buttons text-surface px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl min-w-[200px] text-center"
                        >
                            Register Your Dog
                        </Link>

                        <Link
                            href="/about"
                            className="border border-primary text-primary px-8 py-4 rounded-xl font-heading font-semibold hover:bg-primary hover:text-surface transition-all min-w-[200px] text-center"
                        >
                            How It Works
                        </Link>
                    </div>

                    <p className="mt-6 text-sm font-body text-text-muted">
                        Questions? Check out our <Link href="/faq" className="text-accent hover:underline">FAQ</Link> or <Link href="/contact" className="text-accent hover:underline">contact us</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}