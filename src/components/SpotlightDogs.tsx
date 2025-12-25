// src/components/SpotlightDogs.tsx - FIXED VERSION
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Award, Calendar, Star, Heart } from "lucide-react";

interface SpotlightDog {
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

export default function SpotlightDogs() {
    const [spotlightDogs, setSpotlightDogs] = useState<SpotlightDog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSpotlightDogs();
    }, []);

    async function fetchSpotlightDogs() {
        try {
            setLoading(true);

            // Query the view we created
            const { data, error } = await supabase
                .from("spotlight_dogs_view")
                .select("*")
                .limit(3); // Show max 3 spotlight dogs

            if (error) {
                console.error("Error fetching spotlight dogs:", error);
                // Fallback to direct table query if view fails
                await fetchSpotlightDogsFallback();
                return;
            }

            console.log("Spotlight dogs fetched:", data);
            setSpotlightDogs(data || []);

        } catch (error) {
            console.error("Error fetching spotlight dogs:", error);
            setSpotlightDogs([]);
        } finally {
            setLoading(false);
        }
    }

    // Fallback function if view doesn't work
    async function fetchSpotlightDogsFallback() {
        try {
            const { data, error } = await supabase
                .from("registrations")
                .select(`
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
        `)
                .eq("is_spotlight", true)
                .eq("status", "completed")
                .or("spotlight_expires_at.is.null,spotlight_expires_at.gt.NOW()")
                .order("spotlight_order", { ascending: true, nullsFirst: true })
                .order("created_at", { ascending: false })
                .limit(3);

            if (error) throw error;

            // Type the data properly
            const dogsData = data as FallbackDog[] | null;

            // Add the is_spotlight_active field manually with proper typing
            const dogsWithActiveStatus = (dogsData || []).map((dog: FallbackDog) => ({
                ...dog,
                is_spotlight_active: true // Since we filtered for active ones
            }));

            setSpotlightDogs(dogsWithActiveStatus);

        } catch (error) {
            console.error("Error in fallback fetch:", error);
            setSpotlightDogs([]);
        }
    }

    // Format date for display
    function formatExpirationDate(dateString: string | null): string | null {
        if (!dateString) return null;

        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric'
        };

        // Add year if it's not current year
        if (date.getFullYear() !== new Date().getFullYear()) {
            options.year = 'numeric';
        }

        return date.toLocaleDateString('en-US', options);
    }

    if (loading) {
        return (
            <div className="bg-surface p-8 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 bg-gray-100 rounded w-32"></div>
                                    <div className="h-4 bg-gray-100 rounded w-24"></div>
                                    <div className="h-3 bg-gray-100 rounded w-40"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (spotlightDogs.length === 0) {
        return (
            <div className="bg-surface p-8 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-6">
                    <Award className="w-6 h-6 text-primary/40" />
                    <h3 className="font-heading text-2xl font-semibold text-primary">
                        Spotlight Dogs
                    </h3>
                </div>
                <div className="text-center py-8 text-text-muted">
                    <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="font-medium text-text">No spotlight dogs featured yet</p>
                    <p className="text-sm mt-2 max-w-sm mx-auto">
                        Spotlight dogs are special dogs chosen by WCU admins for their inspiring stories and achievements
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium"
                        >
                            <Heart className="w-4 h-4" />
                            Register your dog to be considered
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="font-heading text-2xl font-semibold text-primary">
                    Spotlight Dogs
                </h3>
            </div>

            <div className="space-y-6">
                {spotlightDogs.map((dog: SpotlightDog, index: number) => (
                    <div
                        key={dog.id}
                        className="group relative overflow-hidden rounded-xl border border-border hover:border-accent/30 transition-all hover:shadow-md bg-white"
                    >
                        {/* Spotlight badge */}
                        {dog.spotlight_reason && (
                            <div className="absolute top-3 left-3 z-10">
                                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-accent text-white rounded-full">
                                    <Star className="w-3 h-3" />
                                    {dog.spotlight_reason}
                                </span>
                            </div>
                        )}

                        {/* Expiration notice */}
                        {dog.spotlight_expires_at && (
                            <div className="absolute top-3 right-3 z-10">
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-full">
                                    <Calendar className="w-3 h-3" />
                                    {formatExpirationDate(dog.spotlight_expires_at)}
                                </span>
                            </div>
                        )}

                        <Link
                            href={`/dogs/${dog.registration_number}`}
                            className="block p-4"
                        >
                            <div className="flex items-start gap-4">
                                {/* Dog photo */}
                                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    {dog.photo_url ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={dog.photo_url}
                                                alt={dog.dog_name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="80px"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                            <Heart className="w-8 h-8 text-primary/40" />
                                        </div>
                                    )}
                                </div>

                                {/* Dog info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-heading font-semibold text-lg text-primary truncate">
                                            {dog.dog_name}
                                        </h4>
                                        <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                                            {dog.registration_number}
                                        </span>
                                    </div>

                                    <p className="text-sm text-text-muted mb-2 line-clamp-1">
                                        {dog.breed_description}
                                    </p>

                                    {dog.shelter_name && (
                                        <p className="text-xs text-accent font-medium mb-2">
                                            Rescued from: {dog.shelter_name}
                                            {dog.shelter_city && `, ${dog.shelter_city}`}
                                            {dog.shelter_state && `, ${dog.shelter_state}`}
                                        </p>
                                    )}

                                    {/* Short excerpt from rescue story */}
                                    {dog.rescue_story && (
                                        <div className="mt-2">
                                            <p className="text-sm text-text line-clamp-2 italic">
                                                "{dog.rescue_story.length > 100
                                                    ? `${dog.rescue_story.substring(0, 100)}...`
                                                    : dog.rescue_story}"
                                            </p>
                                        </div>
                                    )}

                                    {/* View profile link */}
                                    <div className="mt-3 text-sm text-accent font-medium group-hover:text-accent/80 transition-colors">
                                        Read full story →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* View all spotlight dogs link */}
            <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-text-muted">
                        Featured by WCU admins
                    </p>
                    <Link
                        href="/spotlight"
                        className="text-sm text-accent hover:text-accent/80 font-medium"
                    >
                        View all spotlight dogs →
                    </Link>
                </div>
            </div>
        </div>
    );
}