// app/dog/[wcuNumber]/components/living/LivingShelterRecognition.tsx
import { Heart, Globe } from 'lucide-react'

interface LivingShelterRecognitionProps {
    shelterName: string | null
    shelterCity: string | null
    shelterState: string | null
    shelterWebsite: string | null
}

export default function LivingShelterRecognition({
    shelterName,
    shelterCity,
    shelterState,
    shelterWebsite
}: LivingShelterRecognitionProps) {
    return (
        <div className="bg-gradient-to-br from-dog-background to-blue-50 rounded-2xl shadow-xl p-6 border border-dog-border">
            <h2 className="text-xl font-bold text-dog-text mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-dog-error" />
                Shelter Recognition
            </h2>

            <div className="space-y-3">
                {shelterName && (
                    <div>
                        <p className="text-sm text-dog-text-muted">Shelter/Rescue</p>
                        <p className="font-semibold text-dog-text font-body">{shelterName}</p>
                    </div>
                )}

                {(shelterCity || shelterState) && (
                    <div>
                        <p className="text-sm text-dog-text-muted">Location</p>
                        <p className="text-dog-text font-body">
                            {[shelterCity, shelterState].filter(Boolean).join(', ')}
                        </p>
                    </div>
                )}

                {shelterWebsite && (
                    <a
                        href={shelterWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-dog-accent hover:text-dog-error font-medium hover:underline font-body"
                    >
                        <Globe className="w-4 h-4 mr-1" />
                        Visit Website
                    </a>
                )}
            </div>
        </div>
    )
}