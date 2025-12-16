// app/dog/[wcuNumber]/components/LivingDogProfile.tsx
import { DogWithRelations } from '@/types/database'
import { format } from 'date-fns'
import CertificatePreview from './CertificatePreview'
import ShelterCard from './ShelterCard'
import Timeline from './Timeline'

interface LivingDogProfileProps {
    dog: DogWithRelations
}

export default function LivingDogProfile({ dog }: LivingDogProfileProps) {
    const timelineEvents = [
        {
            date: dog.birth_date,
            title: 'Birthday',
            description: 'Born into this world',
            icon: '🎂'
        },
        {
            date: dog.gotcha_date,
            title: 'Gotcha Day',
            description: `Found their forever home with ${dog.owners?.first_name}`,
            icon: '🏡'
        },
        {
            date: new Date(),
            title: 'Today',
            description: 'Living their best life',
            icon: '❤️',
            isCurrent: true
        }
    ]

    return (
        <div className="bg-gradient-to-b from-yellow-50 to-white">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-amber-900 mb-4">
                        {dog.name}
                    </h1>
                    <p className="text-xl text-amber-700">
                        WCU {dog.wcu_number} • Registered {format(new Date(dog.registered_at), 'MMMM d, yyyy')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Dog Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Dog Photo */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                                {dog.photo_url ? (
                                    <img
                                        src={dog.photo_url}
                                        alt={dog.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-8xl">🐕</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dog's Story */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3">
                                <span>📖</span> {dog.name}'s Story
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {dog.bio || `Meet ${dog.name}, a wonderful mixed-breed dog registered with the World Canine Union. ${dog.name} is a ${dog.breed || 'mixed breed'} who brings joy to everyone they meet.`}
                                </p>

                                {/* Key Details */}
                                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                                        <div className="text-2xl mb-2">🎂</div>
                                        <div className="font-semibold text-amber-900">Birth Date</div>
                                        <div>{dog.birth_date ? format(new Date(dog.birth_date), 'MMM d, yyyy') : 'Unknown'}</div>
                                    </div>
                                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                                        <div className="text-2xl mb-2">🏡</div>
                                        <div className="font-semibold text-amber-900">Gotcha Day</div>
                                        <div>{format(new Date(dog.gotcha_date), 'MMM d, yyyy')}</div>
                                    </div>
                                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                                        <div className="text-2xl mb-2">⚖️</div>
                                        <div className="font-semibold text-amber-900">Weight</div>
                                        <div>{dog.weight_lbs ? `${dog.weight_lbs} lbs` : 'Unknown'}</div>
                                    </div>
                                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                                        <div className="text-2xl mb-2">📍</div>
                                        <div className="font-semibold text-amber-900">Location</div>
                                        <div>{dog.location_city || 'Unknown'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Certificate Preview */}
                        <CertificatePreview wcuNumber={dog.wcu_number} />

                        {/* Shelter Recognition */}
                        {dog.shelters && (
                            <ShelterCard shelter={dog.shelters} />
                        )}

                        {/* Timeline */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-amber-900 mb-4">
                                Life Journey
                            </h3>
                            <Timeline events={timelineEvents} />
                        </div>

                        {/* Update Request CTA */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-2">Update Information?</h3>
                            <p className="mb-4 opacity-90">
                                Need to update {dog.name}'s details or add photos?
                            </p>
                            <a
                                href={`/request-update?wcu=${dog.wcu_number}`}
                                className="inline-block bg-white text-amber-700 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition"
                            >
                                Request Update
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}