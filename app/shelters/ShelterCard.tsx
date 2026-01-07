interface ShelterCardProps {
    shelter: {
        shelter_name: string;
        shelter_city: string | null;
        shelter_state: string | null;
        shelter_website: string | null;
        dog_count: number;
        shelter_featured?: boolean;
    };
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
    const location = `${shelter.shelter_city ? shelter.shelter_city + ', ' : ''}${shelter.shelter_state}`;
    const isFeatured = shelter.shelter_featured === true;

    return (
        <div className={`bg-surface rounded-2xl p-6 shadow-lg border ${isFeatured ? 'border-2 border-accent/20' : 'border-border'} hover:shadow-xl transition-shadow relative`}>
            {isFeatured && (
                <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-0 rounded-full">
                        ★ Featured
                    </span>
                </div>
            )}
            <h3 className={`text-xl font-heading font-semibold text-primary mb-2 ${isFeatured ? 'pr-12' : ''}`}>
                {shelter.shelter_name}
            </h3>
            <p className="text-text-muted mb-3">{location}</p>
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-primary font-semibold">
                    {shelter.dog_count} dog{shelter.dog_count !== 1 ? 's' : ''} registered
                </span>

            </div>
            {shelter.shelter_website && (
                <a
                    href={shelter.shelter_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-buttons hover:underline text-sm font-medium"
                >
                    Visit Website →
                </a>
            )}
        </div>
    );
}