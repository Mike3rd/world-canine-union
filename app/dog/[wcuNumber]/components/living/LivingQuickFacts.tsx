// app/dog/[wcuNumber]/components/living/LivingQuickFacts.tsx
import { CalendarDays, Users, Cake, Home, MapPin, Palette } from 'lucide-react'

interface LivingQuickFactsProps {
    breedDescription: string | null
    birthDate: string | null
    gotchaDate: string | null
    location: string | null
    dogColor: string | null
}

export default function LivingQuickFacts({
    breedDescription,
    birthDate,
    gotchaDate,
    location,
    dogColor
}: LivingQuickFactsProps) {

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="bg-dog-surface rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-dog-text mb-4 flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-dog-secondary" />
                Quick Facts
            </h2>

            <div className="space-y-4">
                {breedDescription && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Users className="w-5 h-5 text-dog-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-dog-text-muted">Breed</p>
                            <p className="font-medium text-dog-text font-body">{breedDescription}</p>
                        </div>
                    </div>
                )}

                {birthDate && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Cake className="w-5 h-5 text-dog-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-dog-text-muted">Birth Date</p>
                            <p className="font-medium text-dog-text font-body">{formatDate(birthDate)}</p>
                        </div>
                    </div>
                )}

                {gotchaDate && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Home className="w-5 h-5 text-dog-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-dog-text-muted">Gotcha Day</p>
                            <p className="font-medium text-dog-text font-body">{formatDate(gotchaDate)}</p>
                        </div>
                    </div>
                )}

                {location && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <MapPin className="w-5 h-5 text-dog-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-dog-text-muted">Location</p>
                            <p className="font-medium text-dog-text font-body">{location}</p>
                        </div>
                    </div>
                )}

                {dogColor && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Palette className="w-5 h-5 text-dog-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-dog-text-muted">Color</p>
                            <p className="font-medium text-dog-text font-body">{dogColor}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}