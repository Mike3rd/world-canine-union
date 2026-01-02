// app/browse/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, Hash, Dog, Filter } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface DogRegistration {
    registration_number: string;
    dog_name: string;
    breed_description: string;
    shelter_name: string | null;
    created_at: string;
    photo_url: string | null;
    is_memorial?: boolean;
}

export default function BrowsePage() {
    const [wcuNumber, setWcuNumber] = useState('');
    const [breedSearch, setBreedSearch] = useState('');
    const [breedResults, setBreedResults] = useState<DogRegistration[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);

    // Handle WCU number search
    const handleWcuSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (wcuNumber.trim()) {
            const cleanNumber = wcuNumber.trim().toUpperCase().replace(/^WCU-?/, '');
            const paddedNumber = cleanNumber.padStart(5, '0');
            window.location.href = `/dog/WCU-${cleanNumber}`;
        }
    };

    // Handle breed search
    const handleBreedSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!breedSearch.trim()) return;

        setLoading(true);
        setSearchPerformed(true);

        try {
            const { data, error } = await supabase
                .from('registrations')
                .select('registration_number, dog_name, breed_description, shelter_name, created_at, photo_url, is_memorial')
                .eq('status', 'completed')
                .ilike('breed_description', `%${breedSearch}%`)
                .order('created_at', { ascending: false })
                .limit(50); // Limit results for performance

            if (error) throw error;
            setBreedResults(data || []);
        } catch (error) {
            console.error('Error searching breeds:', error);
            setBreedResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Popular breed suggestions
    const popularBreeds = [
        'Labrador Mix', 'German Shepherd Mix', 'Golden Retriever Mix',
        'Poodle Mix', 'Chihuahua Mix', 'Bulldog Mix',
        'Beagle Mix', 'Pit Bull Mix', 'Dachshund Mix',
        'Boxer Mix', 'Siberian Husky Mix', 'Australian Shepherd Mix'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            {/* Hero Header */}
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
                            Search by WCU number or browse dogs by breed
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: WCU Number Search */}
                    <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                        <div className="flex items-center mb-6">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                                <Hash className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-heading font-bold text-primary">
                                Search by WCU Number
                            </h2>
                        </div>

                        <p className="text-text-muted mb-8">
                            Find any registered dog using their unique WCU number.
                        </p>

                        <form onSubmit={handleWcuSearch} className="space-y-4">
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted font-mono">
                                    WCU-
                                </div>
                                <input
                                    type="text"
                                    value={wcuNumber}
                                    onChange={(e) => setWcuNumber(e.target.value.replace(/\D/g, ''))}
                                    placeholder="00001"
                                    className="w-full pl-16 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white font-mono text-lg"
                                    maxLength={5}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-heading font-bold py-4 px-6 rounded-xl text-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                            >
                                <Search className="w-5 h-5 mr-2" />
                                Go to Dog's Profile
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Breed Search */}
                    <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                        <div className="flex items-center mb-6">
                            <div className="bg-secondary/10 p-3 rounded-full mr-4">
                                <Filter className="w-6 h-6 text-secondary" />
                            </div>
                            <h2 className="text-2xl font-heading font-bold text-primary">
                                Search by Breed
                            </h2>
                        </div>

                        <p className="text-text-muted mb-8">
                            Find dogs by breed type. Try "Labrador Mix", "Shepherd", or any breed description.
                        </p>

                        <form onSubmit={handleBreedSearch} className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                                <input
                                    type="text"
                                    value={breedSearch}
                                    onChange={(e) => setBreedSearch(e.target.value)}
                                    placeholder="Enter breed (e.g., 'Labrador Mix', 'Chihuahua', 'Shepherd')"
                                    className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-4 bg-accent text-white font-heading font-bold py-4 px-6 rounded-xl text-lg hover:opacity-90 transition-opacity"
                            >
                                Search Breeds
                            </button>
                        </form>

                        {/* Popular Breed Suggestions */}
                        <div className="mb-8">
                            <h3 className="font-heading font-bold text-primary mb-4">Popular Searches</h3>
                            <div className="flex flex-wrap gap-2">
                                {popularBreeds.map((breed) => (
                                    <button
                                        key={breed}
                                        onClick={() => {
                                            setBreedSearch(breed);
                                            // Trigger search after a brief delay
                                            setTimeout(() => {
                                                document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                            }, 100);
                                        }}
                                        className="bg-gray-50 hover:bg-primary/5 border border-border rounded-full px-4 py-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                                    >
                                        {breed}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breed Results Section */}
                {searchPerformed && (
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
                                    <DogCard key={dog.registration_number} dog={dog} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-text-muted text-lg mb-4">
                                    No dogs found matching "{breedSearch}"
                                </p>
                                <p className="text-text-muted text-sm">
                                    Try a different breed term or check back soon as our registry grows!
                                </p>
                            </div>
                        )}
                    </div>
                )}

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

// DogCard Component (matches your homepage style)
function DogCard({ dog }: { dog: DogRegistration }) {
    return (
        <Link
            href={`/dog/${dog.registration_number}`}
            className="block p-4 hover:bg-primary/5 rounded-lg transition-colors border-b border-border last:border-0 group"
        >
            <div className="flex items-center gap-4">
                {/* Image */}
                <div className="flex-shrink-0">
                    <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border border-border overflow-hidden w-16 h-16">
                        {dog.photo_url ? (
                            <img
                                src={dog.photo_url}
                                alt={dog.dog_name}
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

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold text-sm">
                                {dog.registration_number}
                            </span>
                            <h4 className="font-medium text-text truncate">
                                {dog.dog_name}
                            </h4>
                        </div>
                        {dog.is_memorial && (
                            <span className="text-xs font-medium bg-blue-500/10 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                                Memorial
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-text-muted mb-1">
                        {dog.breed_description || 'Mixed Breed'}
                    </p>

                    {dog.shelter_name && (
                        <p className="text-xs text-text-muted">
                            From: {dog.shelter_name}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}