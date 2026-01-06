// src/components/ShelterList.tsx
"use client";

import Link from "next/link";


interface Shelter {
    id?: string;
    shelter_name: string;
    shelter_city: string | null;
    shelter_state: string | null;
    shelter_website?: string | null;
    dog_count: number;
    logo_url?: string; // Optional if you add this field
}

interface ShelterListProps {
    shelters: Shelter[];
    loading?: boolean;
}

export default function ShelterList({ shelters, loading = false }: ShelterListProps) {
    // LOADING SKELETON
    if (loading || !shelters.length) {
        return (
            <div className="bg-surface p-8 rounded-2xl border border-border">
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-6 animate-pulse"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    // LOADED CONTENT
    return (
        <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                Rescue Partners
            </h3>
            <div className="space-y-4">
                {shelters.map(shelter => {
                    // Format location
                    const locationParts = [];
                    if (shelter.shelter_city) locationParts.push(shelter.shelter_city);
                    if (shelter.shelter_state) locationParts.push(shelter.shelter_state);
                    const location = locationParts.join(", ") || "Location not specified";

                    return (
                        <div
                            key={shelter.id || shelter.shelter_name}
                            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-primary/5 transition-colors"
                        >
                            {/* Optional logo - match your data structure */}
                            {shelter.logo_url ? (
                                <img
                                    src={shelter.logo_url}
                                    alt={shelter.shelter_name}
                                    width={40}
                                    height={40}
                                    className="rounded"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                                    <span className="text-primary font-bold">🏠</span>
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{shelter.shelter_name}</h4>
                                <p className="text-sm text-text-muted">{location}</p>
                                {shelter.dog_count > 0 && (
                                    <p className="text-xs text-accent mt-1">
                                        {shelter.dog_count} dog{shelter.dog_count !== 1 ? 's' : ''} registered
                                    </p>
                                )}
                            </div>

                            {/* Optional website link */}
                            {shelter.shelter_website && (
                                <a
                                    href={shelter.shelter_website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-accent hover:underline whitespace-nowrap"
                                >
                                    Visit →
                                </a>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Optional footer link */}
            <div className="mt-6 text-center">
                <Link
                    href="/shelters"
                    className="text-accent hover:underline font-medium"
                >
                    View all rescue partners →
                </Link>
            </div>
        </div>
    );
}