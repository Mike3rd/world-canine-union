'use client';

interface PopularBreedsProps {
    breeds: string[];
    onSelectBreed: (breed: string) => void;
}

export default function PopularBreeds({ breeds, onSelectBreed }: PopularBreedsProps) {
    if (breeds.length === 0) return null;

    return (
        <div className="mb-8">
            <h3 className="font-heading font-bold text-primary mb-4">Popular Breeds</h3>
            <div className="flex flex-wrap gap-2">
                {breeds.map((breed) => (
                    <button
                        key={breed}
                        onClick={() => onSelectBreed(breed)}
                        className="bg-gray-50 hover:bg-primary/5 border border-border rounded-full px-4 py-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                    >
                        {breed}
                    </button>
                ))}
            </div>
        </div>
    );
}