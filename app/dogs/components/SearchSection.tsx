'use client';

import { Search, Hash, Filter, Sparkles } from 'lucide-react';
import PopularBreeds from './PopularBreeds';

interface SearchSectionProps {
    wcuNumber: string;
    breedSearch: string;
    loading: boolean;
    popularBreeds: string[];

    onWcuNumberChange: (value: string) => void;
    onBreedSearchChange: (value: string) => void;
    onWcuSearch: (e: React.FormEvent) => void;
    onBreedSearch: (e: React.FormEvent) => void;
    onSelectBreed: (breed: string) => void;
}

export default function SearchSection({
    wcuNumber,
    breedSearch,
    loading,
    popularBreeds,
    onWcuNumberChange,
    onBreedSearchChange,
    onWcuSearch,
    onBreedSearch,
    onSelectBreed
}: SearchSectionProps) {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: WCU Search */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm">
                <div className="flex items-center mb-6">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Hash className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-primary">
                        Search by WCU Number
                    </h2>
                </div>

                <form onSubmit={onWcuSearch} className="space-y-4">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted font-mono">
                            WCU-
                        </div>
                        <input
                            type="text"
                            value={wcuNumber}
                            onChange={(e) => onWcuNumberChange(e.target.value)}
                            placeholder="00001 or 100000"
                            className="w-full pl-16 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white font-mono text-lg"
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
                        Search by Breed Name
                    </h2>
                </div>

                <form onSubmit={onBreedSearch} className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                            type="text"
                            value={breedSearch}
                            onChange={(e) => onBreedSearchChange(e.target.value)}
                            placeholder="Enter breed name (e.g., Labrador, Chihuahua, Bulldog)"
                            className="w-full pl-12 pr-4 py-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-accent text-white font-heading font-bold py-4 px-6 rounded-xl text-lg hover:opacity-90 transition-opacity"
                    >
                        {loading ? 'Searching...' : 'Search Breeds'}
                    </button>
                </form>
                <PopularBreeds
                    breeds={popularBreeds}
                    onSelectBreed={onSelectBreed}
                />
            </div>
        </div>
    );
}