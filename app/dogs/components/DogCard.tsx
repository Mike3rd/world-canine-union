import Link from 'next/link';
import { DogRegistration } from '../../../types/database';

interface DogCardProps {
    dog: DogRegistration;
    searchTerm: string;
}

export default function DogCard({ dog, searchTerm }: DogCardProps) {
    const cleanDescription = dog.breed_description
        ? dog.breed_description.replace(/\s*\+\s*/g, ' & ')
        : 'Mixed Breed';

    return (
        <Link
            href={`/dog/${dog.registration_number}`}
            className="block p-4 hover:bg-primary/5 rounded-lg transition-colors border-b border-border last:border-0 group"
        >
            <div className="flex items-start gap-4">
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

                <div className="flex-1 min-w-0">
                    {/* Mobile-stacked header section */}
                    <div className="mb-2">
                        {/* WCU# on its own line */}
                        <div className="mb-1">
                            <span className="text-primary font-bold text-sm">
                                {dog.registration_number}
                            </span>
                        </div>

                        {/* Dog name and memorial badge - side by side on desktop, stacked on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4 className="font-medium text-text text-lg sm:text-base">
                                {dog.dog_name}
                            </h4>

                            {dog.is_memorial && (
                                <span className="self-start sm:self-center text-xs font-medium bg-blue-500/10 text-blue-700 px-2 py-1 rounded border border-blue-200 whitespace-nowrap">
                                    Memorial
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Breed description with search highlighting */}
                    <p
                        className="text-sm text-text-muted mb-2"
                        dangerouslySetInnerHTML={{
                            __html: cleanDescription.replace(
                                new RegExp(`(${searchTerm.replace(/\s*mix\s*/gi, '')})`, 'gi'),
                                '<mark class="bg-yellow-100 font-medium">$1</mark>'
                            )
                        }}
                    />

                    {/* Shelter info */}
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