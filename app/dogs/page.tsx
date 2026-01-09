'use client';

import { useState, useEffect } from 'react';
import { Dog } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import { DogRegistration } from '../../types/database';

export default function DogsSearchPage() {
    const [wcuNumber, setWcuNumber] = useState('');
    const [breedSearch, setBreedSearch] = useState('');
    const [breedResults, setBreedResults] = useState<DogRegistration[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [popularBreeds, setPopularBreeds] = useState<string[]>([]);

    // --- ADD THESE 3 NEW STATE VARIABLES ---
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const DOGS_PER_PAGE = 5; // Constant for batch size

    useEffect(() => {
        fetchPopularBreeds();
    }, []);

    async function fetchPopularBreeds() {
        try {
            // Fetch all completed registrations
            const { data, error } = await supabase
                .from('registrations')
                .select('breed_description')
                .eq('status', 'completed')
                .not('breed_description', 'is', null);

            if (error) throw error;
            if (!data || data.length === 0) {
                setPopularBreeds([]);
                return;
            }

            // Count frequencies of the PRIMARY breed only
            const breedCountMap = new Map<string, number>();

            data.forEach((dog: DogRegistration) => {  // <-- ADD TYPE HERE
                if (dog.breed_description) {
                    // Extract primary breed - handle both cases:
                    const primaryBreed = dog.breed_description
                        .split('+')[0]
                        .trim()
                        .toLowerCase();

                    const cleanedBreed = primaryBreed
                        .replace(/\s*mix\s*/gi, '')
                        .replace(/\s*\/\s*/g, ' ')
                        .trim();

                    if (cleanedBreed && cleanedBreed.length > 1) {
                        breedCountMap.set(
                            cleanedBreed,
                            (breedCountMap.get(cleanedBreed) || 0) + 1
                        );
                    }
                }
            });

            // Convert to array, sort by count, and take top 5
            const topBreeds = Array.from(breedCountMap.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([breed]) => {
                    return breed
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                });

            console.log('Top 5 breeds calculated:', topBreeds);
            setPopularBreeds(topBreeds);

        } catch (error) {
            console.error('Error fetching popular breeds:', error);
            setPopularBreeds([]);
        }
    }

    const handleWcuSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (wcuNumber.trim()) {
            let cleanNumber = wcuNumber.trim().toUpperCase();
            if (!cleanNumber.startsWith('WCU-')) {
                cleanNumber = 'WCU-' + cleanNumber.replace(/\D/g, '');
            }
            window.location.href = `/dog/${cleanNumber}`;
        }
    };

    const handleBreedSearch = async (e: React.FormEvent, loadMore = false) => {
        e.preventDefault();
        if (!breedSearch.trim() && !loadMore) return;

        // Set correct loading state
        if (loadMore) {
            setIsLoadingMore(true);
        } else {
            setLoading(true);
            setSearchPerformed(true);
        }

        try {
            const cleanSearch = breedSearch.trim().toLowerCase().replace(/\s*mix\s*/gi, '').trim();

            // Determine which page to fetch
            const pageToFetch = loadMore ? currentPage + 1 : 1;
            const from = (pageToFetch - 1) * DOGS_PER_PAGE;
            const to = from + DOGS_PER_PAGE - 1;

            // Build query with pagination
            let query = supabase
                .from('registrations')
                .select('registration_number, dog_name, breed_description, shelter_name, created_at, photo_url, is_memorial', { count: 'exact' })
                .eq('status', 'completed')
                .order('created_at', { ascending: false })
                .range(from, to);

            // Add breed filter if searching
            if (cleanSearch) {
                // Search only primary breed (before +)
                query = query.or(`breed_description.ilike.${cleanSearch}%,breed_description.ilike.%+ ${cleanSearch}%`);
            }

            const { data, error, count } = await query;

            if (error) throw error;

            // Update results based on whether we're loading more
            if (loadMore) {
                setBreedResults(prev => [...prev, ...(data || [])]);
                setCurrentPage(pageToFetch);
            } else {
                setBreedResults(data || []);
                setCurrentPage(1);
            }

            // Check if there are more results available
            const totalResults = count || 0;
            const loadedResults = loadMore ? breedResults.length + (data?.length || 0) : (data?.length || 0);
            setHasMore(loadedResults < totalResults);

        } catch (error) {
            console.error('Error searching breeds:', error);
            if (!loadMore) setBreedResults([]);
        } finally {
            if (loadMore) {
                setIsLoadingMore(false);
            } else {
                setLoading(false);
            }
        }
    };

    // Separate handler for the Load More button
    const handleLoadMore = (e: React.FormEvent) => {
        e.preventDefault();
        if (hasMore && !isLoadingMore) {
            handleBreedSearch(e, true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-header-text">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <Dog className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-heading font-bold">
                                Find a Dog
                            </h1>
                        </div>
                        <p className="text-xl opacity-90">
                            Search by WCU number or browse dogs by breed name
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <SearchSection
                    wcuNumber={wcuNumber}
                    breedSearch={breedSearch}
                    loading={loading}
                    popularBreeds={popularBreeds}
                    onWcuNumberChange={setWcuNumber}
                    onBreedSearchChange={setBreedSearch}
                    onWcuSearch={handleWcuSearch}
                    onBreedSearch={handleBreedSearch}
                    onSelectBreed={(breed) => {
                        setBreedSearch(breed);
                        setTimeout(() => {
                            document.querySelector('form')?.dispatchEvent(
                                new Event('submit', { cancelable: true, bubbles: true })
                            );
                        }, 100);
                    }}
                />

                <ResultsSection
                    loading={loading}
                    searchPerformed={searchPerformed}
                    breedSearch={breedSearch}
                    breedResults={breedResults}
                    hasMore={hasMore} // ADD THIS
                    isLoadingMore={isLoadingMore} // ADD THIS
                    onClearSearch={() => {
                        setSearchPerformed(false);
                        setBreedResults([]);
                        setCurrentPage(1);
                        setHasMore(false);
                    }}
                    onLoadMore={handleLoadMore} // ADD THIS
                />

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-5 pt-8 border-t border-border">
                    <Link href="/" className="text-accent hover:text-accent/80 font-medium text-center">
                        ← Return to Homepage
                    </Link>
                    <Link href="/register" className="text-accent hover:text-accent/80 font-medium text-center">
                        Register Your Dog →
                    </Link>
                </div>
            </div>
        </div>
    );
}