// app/dog/[wcuNumber]/components/living/LivingDescriptionCard.tsx
import { Star, Heart } from 'lucide-react'

interface LivingDescriptionCardProps {
    dogName: string
    description: string | null
    rescueStory: string | null
}

export default function LivingDescriptionCard({
    dogName,
    description,
    rescueStory
}: LivingDescriptionCardProps) {
    return (
        <div className="bg-dog-surface rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-dog-text mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-dog-accent" />
                {dogName}'s Physical Description
            </h2>

            {description && (
                <div className="mb-6">
                    <p className="text-dog-neutral text-lg leading-relaxed">
                        {description}
                    </p>
                </div>
            )}

            {rescueStory && (
                <div className="p-6 bg-gradient-to-r from-dog-background to-blue-50 rounded-xl border border-dog-border">
                    <h3 className="text-xl font-semibold text-dog-text mb-3 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-dog-error" />
                        Rescue & Adoption Story
                    </h3>
                    <p className="text-dog-text-muted leading-relaxed">
                        {rescueStory}
                    </p>
                </div>
            )}
        </div>
    )
}