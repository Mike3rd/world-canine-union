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

    useEffect(() => {
        fetchPopularBreeds();
    }, []);

    async function fetchPopularBreeds() {
        // Fixed: Added proper TypeScript types
        const { data } = await supabase
            .from('registrations')
            .select('breed_description')
            .eq('status', 'completed')
            .limit(100);

        if (data) {
            const breedSet = new Set<string>();

            data.forEach((dog: DogRegistration) => {
                if (dog.breed_description) {
                    const breeds = dog.breed_description
                        .split(/[+&,]/)
                        .map((b: string) => b.trim())
                        .filter((b: string) => b.length > 0)
                        .map((b: string) => b.replace(/\s*mix\s*/gi, '').trim())
                        .filter((b: string) => b.length > 0 && !b.match(/^and$/i));

                    breeds.forEach((breed: string) => breedSet.add(breed));
                }
            });

            const breeds = Array.from(breedSet)
                .filter(breed => breed.length > 2)
                .slice(0, 12);

            setPopularBreeds(breeds);
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

    const handleBreedSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!breedSearch.trim()) return;

        setLoading(true);
        setSearchPerformed(true);

        try {
            const cleanSearch = breedSearch.trim().toLowerCase().replace(/\s*mix\s*/gi, '').trim();

            const { data, error } = await supabase
                .from('registrations')
                .select('registration_number, dog_name, breed_description, shelter_name, created_at, photo_url, is_memorial')
                .eq('status', 'completed')
                .or(`breed_description.ilike.%${cleanSearch}%`)
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setBreedResults(data || []);

        } catch (error) {
            console.error('Error searching breeds:', error);
            setBreedResults([]);
        } finally {
            setLoading(false);
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
                    onClearSearch={() => setSearchPerformed(false)}
                />

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-border">
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