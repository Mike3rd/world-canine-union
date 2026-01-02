'use client';

import Link from 'next/link';
import DogCard from './DogCard';
import { DogRegistration } from '@/types/database';

interface ResultsSectionProps {
    loading: boolean;
    searchPerformed: boolean;
    breedSearch: string;
    breedResults: DogRegistration[];
    onClearSearch: () => void;
}

export default function ResultsSection({
    loading,
    searchPerformed,
    breedSearch,
    breedResults,
    onClearSearch
}: ResultsSectionProps) {
    if (!searchPerformed) return null;

    return (
        <div className="mt-12 bg-surface rounded-2xl p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-primary">
                    {loading ? 'Searching...' : `Results for "${breedSearch}" (${breedResults.length} dogs)`}
                </h2>
                {breedResults.length > 0 && (
                    <span className="text-sm text-text-muted">
                        Showing {Math.min(breedResults.length, 50)} of {breedResults.length} dogs
                    </span>
                )}
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : breedResults.length > 0 ? (
                <div className="space-y-4">
                    {breedResults.map((dog) => (
                        <DogCard
                            key={dog.registration_number}
                            dog={dog}
                            searchTerm={breedSearch}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">🐕</div>
                    <p className="text-text-muted text-lg mb-4">
                        No dogs found matching "{breedSearch}"
                    </p>
                    <p className="text-text-muted text-sm mb-6">
                        Try a different breed name or check back soon as our registry grows!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onClearSearch}
                            className="text-accent hover:text-accent/80 font-medium"
                        >
                            ← Clear search
                        </button>
                        <Link
                            href="/"
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            Return to homepage →
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}