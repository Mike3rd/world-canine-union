// app/dog/[wcuNumber]/components/living/LivingProfile.tsx
import { Registration } from '../../../../../types/database'
import LivingHeader from './LivingHeader'
import LivingPhotoCard from './LivingPhotoCard'
import LivingDescriptionCard from './LivingDescriptionCard'
import LivingPersonalityTraits from './LivingPersonalityTraits'
import LivingQuickFacts from './LivingQuickFacts'
import LivingShelterRecognition from './LivingShelterRecognition'
import LivingCertificateCard from './LivingCertificateCard'
import LivingShareCard from './LivingShareCard'


interface LivingProfileProps {
    registration: Registration
}

export default function LivingProfile({ registration }: LivingProfileProps) {
    // Calculate age if birth date exists
    const calculateAge = () => {
        if (!registration.birth_date) return null
        const birthDate = new Date(registration.birth_date)
        const today = new Date()
        const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 +
            (today.getMonth() - birthDate.getMonth())

        if (ageInMonths < 12) {
            return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''} old`
        } else {
            const years = Math.floor(ageInMonths / 12)
            const months = ageInMonths % 12
            return `${years} year${years !== 1 ? 's' : ''}${months > 0 ? `, ${months} month${months !== 1 ? 's' : ''}` : ''} old`
        }
    }

    const age = calculateAge()

    return (
        <div className="min-h-screen bg-dog-background">
            <LivingHeader
                dogName={registration.dog_name}
                registrationNumber={registration.registration_number}
                gender={registration.gender}
                age={age}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Photo & Basic Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <LivingPhotoCard
                            photoUrl={registration.photo_url}
                            dogName={registration.dog_name}
                        />

                        {(registration.dog_description || registration.rescue_story) && (
                            <LivingDescriptionCard
                                dogName={registration.dog_name}
                                description={registration.dog_description}
                                rescueStory={registration.rescue_story}
                            />
                        )}

                        {(registration.special_attributes ||
                            registration.favorite_activities ||
                            registration.unique_traits) && (
                                <LivingPersonalityTraits
                                    specialAttributes={registration.special_attributes}
                                    favoriteActivities={registration.favorite_activities}
                                    uniqueTraits={registration.unique_traits}
                                />
                            )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-8">
                        <LivingQuickFacts
                            breedDescription={registration.breed_description}
                            birthDate={registration.birth_date}
                            gotchaDate={registration.gotcha_date}
                            location={registration.location}
                            dogColor={registration.dog_color}
                            ownerName={registration.owner_name}
                        />

                        {(registration.shelter_name ||
                            registration.shelter_city ||
                            registration.shelter_website) && (
                                <LivingShelterRecognition
                                    shelterName={registration.shelter_name}
                                    shelterCity={registration.shelter_city}
                                    shelterState={registration.shelter_state}
                                    shelterWebsite={registration.shelter_website}
                                />
                            )}

                        {registration.pdf_url && (
                            <LivingCertificateCard
                                dogName={registration.dog_name}
                                pdfUrl={registration.pdf_url}
                            />
                        )}

                        <LivingShareCard dogName={registration.dog_name} />
                    </div>
                </div>
            </div>
        </div>
    )
}