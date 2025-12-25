// app/components/home/DogShowcase.tsx (or rename as needed)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface DogRegistration {
    registration_number: string;
    dog_name: string;
    breed_description: string;
    shelter_name: string | null;
    created_at: string;
    photo_url: string | null;
}

export default function DogShowcase() {
    const [recentDogs, setRecentDogs] = useState<DogRegistration[]>([]);
    const [spotlightDogs, setSpotlightDogs] = useState<DogRegistration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDogData();
    }, []);

    async function fetchDogData() {
        try {
            setLoading(true);

            // Fetch recent registrations (capped at 3)
            const recentPromise = supabase
                .from("registrations")
                .select("registration_number, dog_name, breed_description, shelter_name, created_at, photo_url")
                .eq("status", "completed")
                .order("created_at", { ascending: false })
                .limit(3);

            // Fetch spotlight dogs (capped at 3)
            const spotlightPromise = supabase
                .from("registrations")
                .select("registration_number, dog_name, breed_description, shelter_name, created_at, photo_url")
                .eq("is_spotlight", true)
                .order("created_at", { ascending: false })
                .limit(3);

            // Fetch both in parallel
            const [recentResult, spotlightResult] = await Promise.all([recentPromise, spotlightPromise]);

            if (recentResult.error) console.error("Error fetching recent dogs:", recentResult.error);
            if (spotlightResult.error) console.error("Error fetching spotlight dogs:", spotlightResult.error);

            setRecentDogs(recentResult.data || []);
            setSpotlightDogs(spotlightResult.data || []);

        } catch (error) {
            console.error("Error fetching dog data:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <section className="py-16">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        {[1, 2].map((col) => (
                            <div key={col} className="bg-surface rounded-2xl border border-border p-8">
                                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-surface">
            <div className="container max-w-7xl mx-auto px-4">

                {/* HEADER SECTION */}
                <h2 className="text-4xl font-heading font-bold text-primary text-center mb-6">
                    Your Registration Makes a Difference
                </h2>

                <p className="text-xl font-body2 text-text-muted text-center mb-12 max-w-3xl mx-auto">
                    Every WCU registration includes a <strong>20% donation</strong> that directly supports rescue animals.
                    Here&apos;s how your support helps and what our community has accomplished together.
                </p>
                {/* Two-Column Layout: Spotlight Dogs + Recent Members */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Left Column: Spotlight Dogs */}
                    <div className="bg-re p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
                        <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                            Spotlight Dogs
                        </h3>
                        <div className="space-y-4">
                            {spotlightDogs.length > 0 ? (
                                spotlightDogs.map((dog) => (
                                    <DogCard key={dog.registration_number} dog={dog} isSpotlight={true} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-text-muted">
                                    <p>No spotlight dogs yet</p>
                                    <p className="text-sm mt-2">Featured dogs will appear here</p>
                                </div>
                            )}
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
                                    <DogCard key={dog.registration_number} dog={dog} isSpotlight={false} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-text-muted">
                                    <p>Be the first to register your dog!</p>
                                    <p className="text-sm mt-2">Your dog could be featured here.</p>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
                {/* CTA Section */}
                <div className="text-center">
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

// Reusable DogCard Component
function DogCard({ dog, isSpotlight }: { dog: DogRegistration; isSpotlight: boolean }) {
    return (
        <Link
            href={`/dog/${dog.registration_number}`}
            className="block sm:flex sm:items-center justify-between p-4 hover:bg-primary/5 rounded-lg transition-colors border-b border-border last:border-0 group"
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Image container */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border border-border overflow-hidden w-16 h-[85px] sm:w-12 sm:h-16">
                        {dog.photo_url ? (
                            <img
                                src={dog.photo_url}
                                alt={`${dog.dog_name}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-2xl">🐕</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Text info */}
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-text text-center sm:text-left truncate">
                        <span className="text-primary font-bold">{dog.registration_number}</span>
                        {" "}• {dog.dog_name}
                    </p>
                    <p className="text-sm text-text-muted text-center sm:text-left line-clamp-2">
                        {dog.breed_description || "Mixed Breed"}
                        {dog.shelter_name && ` • Rescued from ${dog.shelter_name}`}
                    </p>
                </div>
            </div>

            {/* Date/Spotlight label */}
            <div className="text-sm text-text-muted mt-3 sm:mt-0 text-center sm:text-right sm:ml-6 whitespace-nowrap">
                {isSpotlight ? "Spotlight" : new Date(dog.created_at).toLocaleDateString()}
            </div>
        </Link>
    );
}