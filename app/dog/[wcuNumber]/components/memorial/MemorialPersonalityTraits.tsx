// app/dog/[wcuNumber]/components/living/MemorialPersonalityTraits.tsx
import { Sparkles } from 'lucide-react'

interface MemorialPersonalityTraitsProps {
    specialAttributes: string | null
    favoriteActivities: string | null
    uniqueTraits: string | null
}

export default function MemorialPersonalityTraits({
    specialAttributes,
    favoriteActivities,
    uniqueTraits
}: MemorialPersonalityTraitsProps) {
    return (
        <div className="bg-dog-surface rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-dog-text mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-dog-secondary" />
                Personality & Traits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {specialAttributes && (
                    <div className="bg-dog-background p-4 rounded-xl border border-dog-border">
                        <h3 className="font-semibold text-dog-text mb-2">Special Attributes</h3>
                        <p className="text-dog-text-muted font-body">{specialAttributes}</p>
                    </div>
                )}

                {favoriteActivities && (
                    <div className="bg-dog-background p-4 rounded-xl border border-dog-border">
                        <h3 className="font-semibold text-dog-text mb-2">Favorite Activities</h3>
                        <p className="text-dog-text-muted font-body">{favoriteActivities}</p>
                    </div>
                )}

                {uniqueTraits && (
                    <div className="bg-dog-background p-4 rounded-xl border border-dog-border">
                        <h3 className="font-semibold text-dog-text mb-2">Unique Traits</h3>
                        <p className="text-dog-text-muted font-body">{uniqueTraits}</p>
                    </div>
                )}
            </div>
        </div>
    )
}