// app/dog/[wcuNumber]/components/MemorialDogProfile.tsx
import { DogWithRelations } from '@/types/database'
import { format } from 'date-fns'
import CertificatePreview from './CertificatePreview'
import ShelterCard from './ShelterCard'
import VirtualCandle from './VirtualCandle'
import Timeline from './Timeline'

interface MemorialDogProfileProps {
    dog: DogWithRelations
}

export default function MemorialDogProfile({ dog }: MemorialDogProfileProps) {
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
            date: dog.memorial_date,
            title: 'Rainbow Bridge',
            description: 'Crossed the Rainbow Bridge',
            icon: '🌈',
            isMemorial: true
        }
    ]

    return (
        <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
            {/* Memorial Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <div className="mb-6">
                        <span className="text-6xl">🌈</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">
                        In Loving Memory of {dog.name}
                    </h1>
                    <p className="text-xl opacity-90">
                        WCU {dog.wcu_number} • {format(new Date(dog.memorial_date!), 'MMMM d, yyyy')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Memorial Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Memorial Photo */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                                {dog.photo_url ? (
                                    <img
                                        src={dog.photo_url}
                                        alt={dog.name}
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-8xl">🐕‍🦺</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Memorial Story */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <span>📖</span> {dog.name}'s Legacy
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    {dog.memorial_bio || dog.bio || `We remember ${dog.name}, who brought endless joy and love into our lives. Their memory lives on in our hearts forever.`}
                                </p>

                                {/* Rainbow Bridge Section */}
                                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">🌈</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                Across the Rainbow Bridge
                                            </h3>
                                            <p className="text-gray-700">
                                                {dog.name} crossed the Rainbow Bridge on {format(new Date(dog.memorial_date!), 'MMMM d, yyyy')}.
                                                {dog.memorial_cause && ` They passed peacefully ${dog.memorial_cause}.`}
                                            </p>
                                            {dog.memorial_favorite_things && (
                                                <div className="mt-4">
                                                    <h4 className="font-semibold text-gray-800 mb-2">Favorite Things:</h4>
                                                    <p className="text-gray-700">{dog.memorial_favorite_things}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Virtual Candle */}
                        <VirtualCandle dogId={dog.id} />

                        {/* Certificate Preview */}
                        <CertificatePreview wcuNumber={dog.wcu_number} />

                        {/* Shelter Donation */}
                        {dog.shelters && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Honor {dog.name}'s Memory
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Consider making a donation to {dog.shelters.name} in {dog.name}'s memory.
                                </p>
                                {dog.shelters.donation_url ? (
                                    <a
                                        href={dog.shelters.donation_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                                    >
                                        Donate in Memory
                                    </a>
                                ) : (
                                    <ShelterCard shelter={dog.shelters} />
                                )}
                            </div>
                        )}

                        {/* Timeline */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Life's Journey
                            </h3>
                            <Timeline events={timelineEvents} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}