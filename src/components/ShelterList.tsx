// src/components/ShelterList.tsx
"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ShelterStats {
    shelter_name: string;
    shelter_city: string | null;
    shelter_state: string | null;
    shelter_website: string | null;
    dog_count: number;
}

interface ShelterListProps {
    shelters: ShelterStats[];
}

export default function ShelterList({ shelters }: ShelterListProps) {
    return (
        <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                Top Rescue Partners
            </h3>
            <div className="space-y-4">
                {shelters.length > 0 ? (
                    shelters.map((shelter, index) => (
                        <ShelterCard
                            key={`${shelter.shelter_name}-${index}`}
                            shelter={shelter}
                            index={index}
                        />
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
    );
}

// Internal ShelterCard component
function ShelterCard({ shelter, index }: { shelter: ShelterStats; index: number }) {
    return (
        <div className="group p-4 hover:bg-primary/5 rounded-lg transition-colors border-b border-border last:border-0">
            <div className="flex items-center justify-between mb-0">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">#{index + 1}</span>
                    <span className="font-medium text-text">{shelter.shelter_name}</span>
                </div>
                <div className="text-right">
                    <span className="text-lg font-bold text-accent">{shelter.dog_count}</span>
                    <p className="text-xs text-text-muted">dogs registered</p>
                </div>
            </div>

            {/* Location line */}
            <p className="text-sm text-text-muted mb-0">
                {shelter.shelter_city && `${shelter.shelter_city}, `}{shelter.shelter_state}
            </p>

            {/* Website link */}
            {shelter.shelter_website && (
                <div className="mt-0">
                    <a
                        href={shelter.shelter_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-secondary hover:text-accent/80 hover:underline"
                    >
                        <ExternalLink className="w-3 h-3" />
                        {shelter.shelter_website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                </div>
            )}
        </div>
    );
}