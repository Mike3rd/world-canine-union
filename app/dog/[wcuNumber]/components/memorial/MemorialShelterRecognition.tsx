// app/dog/[wcuNumber]/components/memorial/MemorialShelterRecognition.tsx
'use client'
import { Heart, Globe, Gift } from 'lucide-react'

interface MemorialShelterRecognitionProps {
    shelterName: string | null
    shelterCity: string | null
    shelterState: string | null
    shelterWebsite: string | null
    dogName: string
}

export default function MemorialShelterRecognition({
    shelterName,
    shelterCity,
    shelterState,
    shelterWebsite,
    dogName
}: MemorialShelterRecognitionProps) {
    return (
        <div className="rounded-2xl shadow-xl p-6 bg-memorial-surface">
            <h2 className="text-xl font-bold mb-4 flex items-center text-memorial-text">
                <Heart className="w-5 h-5 mr-2 text-memorial-accent" />
                Honor Their Memory
            </h2>

            <div className="space-y-4">
                {shelterName && (
                    <div>
                        <p className="text-sm mb-1 text-memorial-text-muted">Consider donating to:</p>
                        <p className="font-semibold font-body text-memorial-text">
                            {shelterName}
                        </p>
                    </div>
                )}

                {(shelterCity || shelterState) && (
                    <div>
                        <p className="text-sm text-memorial-text-muted">Location</p>
                        <p className="font-body text-memorial-text">
                            {[shelterCity, shelterState].filter(Boolean).join(', ')}
                        </p>
                    </div>
                )}

                <div className="pt-4 mt-4 border-t border-memorial-border">
                    <p className="font-body mb-4 text-memorial-text-muted">
                        Honor {dogName}'s memory by supporting {shelterName || 'a local shelter'}.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {shelterWebsite && (
                            <a
                                href={shelterWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center py-2 px-4 rounded-lg font-medium transition bg-memorial-buttons text-white hover:opacity-90"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                Visit Shelter
                            </a>
                        )}

                        <button
                            className="flex-1 inline-flex items-center justify-center py-2 px-4 rounded-lg font-medium transition border bg-memorial-background border-memorial-border text-memorial-text hover:bg-memorial-surface"
                            onClick={() => alert('Donation feature coming soon')}
                        >
                            <Gift className="w-4 h-4 mr-2" />
                            Make Donation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}