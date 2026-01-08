'use client';

import Link from 'next/link';
import DogCard from './DogCard';
import { DogRegistration } from '../../../types/database';

interface ResultsSectionProps {
    loading: boolean;
    searchPerformed: boolean;
    breedSearch: string;
    breedResults: DogRegistration[];
    hasMore: boolean; // ADD THIS
    isLoadingMore: boolean; // ADD THIS
    onClearSearch: () => void;
    onLoadMore: (e: React.FormEvent) => void;
}

export default function ResultsSection({
    loading,
    searchPerformed,
    breedSearch,
    breedResults,
    hasMore,
    isLoadingMore,
    onClearSearch,
    onLoadMore
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
                        Showing {breedResults.length} dogs
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
                <>
                    {/* Dog Results List */}
                    <div className="space-y-4">
                        {breedResults.map((dog) => (
                            <DogCard
                                key={dog.registration_number}
                                dog={dog}
                                searchTerm={breedSearch}
                            />
                        ))}
                    </div>

                    {/* LOAD MORE BUTTON SECTION - ADD THIS */}
                    {hasMore && (
                        <div className="mt-8 pt-6 border-t border-border text-center">
                            <button
                                onClick={onLoadMore}
                                disabled={isLoadingMore}
                                className="bg-buttons text-surface px-6 py-3 rounded-lg font-heading font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoadingMore ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-surface"></span>
                                        Loading more dogs...
                                    </span>
                                ) : (
                                    `Load More ${breedSearch} Dogs`
                                )}
                            </button>
                            <p className="text-sm text-text-muted mt-3">
                                Load the next 20 dogs matching "{breedSearch}"
                            </p>
                        </div>
                    )}

                    {/* END OF RESULTS MESSAGE - ADD THIS */}
                    {!hasMore && breedResults.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-border text-center">
                            <p className="text-text-muted">
                                🐾 You've seen all {breedResults.length} dogs matching "{breedSearch}"!
                            </p>
                            <p className="text-sm text-text-muted mt-2">
                                Try searching for a different breed or use the buttons above.
                            </p>
                        </div>
                    )}
                </>
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