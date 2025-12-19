// app/dog/[wcuNumber]/components/memorial/MemorialProfile.tsx
import { Registration } from '../../../../../types/database'
import MemorialHeader from './MemorialHeader'
import MemorialPhotoCard from './MemorialPhotoCard'
import MemorialRainbowBridge from './MemorialRainbowBridge'
import MemorialVirtualCandle from './MemorialVirtualCandle'
import MemorialTributes from './MemorialTributes'
import MemorialQuickFacts from './MemorialQuickFacts'
import MemorialShelterRecognition from './MemorialShelterRecognition'
import MemorialCertificateCard from './MemorialCertificateCard'
import MemorialShareCard from './MemorialShareCard'

interface MemorialProfileProps {
    registration: Registration & {
        memorial_date?: string | null
        memorial_message?: string | null
        memorial_cause?: string | null
        memorial_favorite_memories?: string | null
    }
}

export default function MemorialProfile({ registration }: MemorialProfileProps) {
    console.log('=== MEMORIAL PROFILE DEBUG ===');
    console.log('memorial_message value:', registration.memorial_message);
    console.log('memorial_message type:', typeof registration.memorial_message);
    console.log('memorial_message exists?', !!registration.memorial_message);
    console.log('memorial_message length:', registration.memorial_message?.length);
    console.log('================================');
    return (
        <div className="min-h-screen bg-memorial-background">
            <MemorialHeader
                dogName={registration.dog_name}
                registrationNumber={registration.registration_number}
                gender={registration.gender}
                memorialDate={registration.memorial_date ?? null}
                gotchaDate={registration.gotcha_date ?? null}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <MemorialPhotoCard
                            photoUrl={registration.photo_url}
                            dogName={registration.dog_name}
                        />

                        <MemorialRainbowBridge
                            dogName={registration.dog_name}
                            birthDate={registration.birth_date}
                            gotchaDate={registration.gotcha_date}
                            memorialDate={registration.memorial_date ?? null}
                            memorialMessage={registration.memorial_message ?? null}
                            location={registration.location}
                            shelterName={registration.shelter_name}
                            shelterState={registration.shelter_state}
                        />
                        {/* 
                        <MemorialVirtualCandle
                            dogId={registration.id}
                            dogName={registration.dog_name}
                        />    */}

                        <MemorialTributes
                            dogId={registration.id}
                            dogName={registration.dog_name}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <MemorialQuickFacts
                            breedDescription={registration.breed_description}
                            birthDate={registration.birth_date}
                            gotchaDate={registration.gotcha_date}
                            location={registration.location}
                            dogColor={registration.dog_color}
                            memorialDate={registration.memorial_date ?? null}
                            ownerName={registration.owner_name}
                        />

                        {registration.memorial_favorite_memories && (
                            <div className="bg-memorial-surface rounded-2xl shadow-xl p-6 border border-memorial-border">
                                <h3 className="text-xl font-bold mb-4 text-memorial-text">
                                    Favorite Memories
                                </h3>
                                <p className="font-body text-memorial-text-muted">
                                    {registration.memorial_favorite_memories}
                                </p>
                            </div>
                        )}

                        {(registration.shelter_name || registration.shelter_website) && (
                            <MemorialShelterRecognition
                                shelterName={registration.shelter_name}
                                shelterCity={registration.shelter_city}
                                shelterState={registration.shelter_state}
                                shelterWebsite={registration.shelter_website}
                                dogName={registration.dog_name}
                            />
                        )}

                        {registration.pdf_url && (
                            <MemorialCertificateCard
                                dogName={registration.dog_name}
                                pdfUrl={registration.pdf_url}
                            />
                        )}

                        <MemorialShareCard dogName={registration.dog_name} />
                    </div>
                </div>
            </div>
        </div>
    )
}