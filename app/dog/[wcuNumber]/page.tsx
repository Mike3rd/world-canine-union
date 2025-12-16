// app/dog/[wcuNumber]/page.tsx - SIMPLIFIED WITH TAILWIND
import { supabase } from "@/lib/supabase"
import { notFound } from 'next/navigation'
import { Registration } from '../../../types/database'
import { CalendarDays, MapPin, Cake, Home, Palette, Heart, Star, Sparkles, Users, Globe } from 'lucide-react'
import Image from 'next/image'
import '../dog-profile.css'


export default async function DogProfilePage({
    params,
}: {
    params: Promise<{ wcuNumber: string }>
}) {
    const { wcuNumber } = await params

    const searchNumber = wcuNumber.toUpperCase()

    const { data: registration, error } = await supabase
        .from('registrations')
        .select(`
      id,
      registration_number,
      dog_name,
      birth_date,
      location,
      breed_description,
      rescue_story,
      photo_url,
      pdf_url,
      dog_description,
      special_attributes,
      favorite_activities,
      unique_traits,
      gotcha_date,
      shelter_name,
      shelter_city,
      shelter_state,
      shelter_website,
      dog_color,
      gender,
      created_at
    `)
        .eq('registration_number', searchNumber)
        .single()

    if (error || !registration) {
        notFound()
    }

    // Format dates
    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

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
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-header-bg text-header-text">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                {registration.dog_name}
                            </h1>
                            <div className="flex items-center space-x-4 text-border">
                                <span className="flex items-center">
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    {registration.registration_number}
                                </span>
                                {registration.gender && (
                                    <span className="capitalize">{registration.gender}</span>
                                )}
                                {age && (
                                    <span>{age}</span>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                                <Heart className="w-5 h-5 mr-2" />
                                <span>World Canine Union</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Photo & Basic Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Photo Card */}
                        <div className="bg-surface rounded-2xl shadow-xl overflow-hidden">
                            <div className="relative bg-gradient-to-br from-background to-border">
                                {registration.photo_url ? (
                                    <div className="relative w-full" style={{ paddingTop: '133.5%' }}>
                                        <Image
                                            src={registration.photo_url}
                                            alt={registration.dog_name}
                                            fill
                                            className="object-contain p-4"
                                            sizes="(max-width: 768px) 100vw, 412px"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="relative" style={{ paddingTop: '133.5%' }}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-8xl mb-4">🐕</div>
                                                <p className="text-neutral font-semibold">Photo Coming Soon!</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Photo Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                    <span className="text-sm font-semibold text-text">Official WCU Photo</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        {(registration.dog_description || registration.rescue_story) && (
                            <div className="bg-surface rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                                    <Star className="w-6 h-6 mr-2 text-accent" />
                                    {registration.dog_name}'s Physical Description
                                </h2>

                                {registration.dog_description && (
                                    <div className="mb-6">
                                        <p className="text-neutral text-lg leading-relaxed">
                                            {registration.dog_description}
                                        </p>
                                    </div>
                                )}

                                {registration.rescue_story && (
                                    <div className="p-6 bg-gradient-to-r from-background to-blue-50 rounded-xl border border-border">
                                        <h3 className="text-xl font-semibold text-text mb-3 flex items-center">
                                            <Heart className="w-5 h-5 mr-2 text-error" />
                                            Rescue & Adoption Story
                                        </h3>
                                        <p className="text-text-muted leading-relaxed">
                                            {registration.rescue_story}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Personality Traits */}
                        {(registration.special_attributes || registration.favorite_activities || registration.unique_traits) && (
                            <div className="bg-surface rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                                    <Sparkles className="w-6 h-6 mr-2 text-secondary" />
                                    Personality & Traits
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {registration.special_attributes && (
                                        <div className="bg-background p-4 rounded-xl border border-border">
                                            <h3 className="font-semibold text-text mb-2">Special Attributes</h3>
                                            <p className="text-text-muted">{registration.special_attributes}</p>
                                        </div>
                                    )}

                                    {registration.favorite_activities && (
                                        <div className="bg-background p-4 rounded-xl border border-border">
                                            <h3 className="font-semibold text-text mb-2">Favorite Activities</h3>
                                            <p className="text-text-muted">{registration.favorite_activities}</p>
                                        </div>
                                    )}

                                    {registration.unique_traits && (
                                        <div className="bg-background p-4 rounded-xl border border-border">
                                            <h3 className="font-semibold text-text mb-2">Unique Traits</h3>
                                            <p className="text-text-muted">{registration.unique_traits}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-8">
                        {/* Quick Facts Card */}
                        <div className="bg-surface rounded-2xl shadow-xl p-6">
                            <h2 className="text-xl font-bold text-text mb-4 flex items-center">
                                <CalendarDays className="w-5 h-5 mr-2 text-secondary" />
                                Quick Facts
                            </h2>

                            <div className="space-y-4">
                                {registration.breed_description && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8">
                                            <Users className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-muted">Breed</p>
                                            <p className="font-medium text-text">{registration.breed_description}</p>
                                        </div>
                                    </div>
                                )}

                                {registration.birth_date && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8">
                                            <Cake className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-muted">Birth Date</p>
                                            <p className="font-medium text-text">{formatDate(registration.birth_date)}</p>
                                        </div>
                                    </div>
                                )}

                                {registration.gotcha_date && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8">
                                            <Home className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-muted">Gotcha Day</p>
                                            <p className="font-medium text-text">{formatDate(registration.gotcha_date)}</p>
                                        </div>
                                    </div>
                                )}

                                {registration.location && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8">
                                            <MapPin className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-muted">Location</p>
                                            <p className="font-medium text-text">{registration.location}</p>
                                        </div>
                                    </div>
                                )}

                                {registration.dog_color && (
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8">
                                            <Palette className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-text-muted">Color</p>
                                            <p className="font-medium text-text">{registration.dog_color}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Shelter Recognition */}
                        {(registration.shelter_name || registration.shelter_city || registration.shelter_website) && (
                            <div className="bg-gradient-to-br from-background to-blue-50 rounded-2xl shadow-xl p-6 border border-border">
                                <h2 className="text-xl font-bold text-text mb-4 flex items-center">
                                    <Heart className="w-5 h-5 mr-2 text-error" />
                                    Shelter Recognition
                                </h2>

                                <div className="space-y-3">
                                    {registration.shelter_name && (
                                        <div>
                                            <p className="text-sm text-text-muted">Shelter/Rescue</p>
                                            <p className="font-semibold text-text">{registration.shelter_name}</p>
                                        </div>
                                    )}

                                    {(registration.shelter_city || registration.shelter_state) && (
                                        <div>
                                            <p className="text-sm text-text-muted">Location</p>
                                            <p className="text-text">
                                                {[registration.shelter_city, registration.shelter_state]
                                                    .filter(Boolean)
                                                    .join(', ')}
                                            </p>
                                        </div>
                                    )}

                                    {registration.shelter_website && (
                                        <a
                                            href={registration.shelter_website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-accent hover:text-error font-medium hover:underline"
                                        >
                                            <Globe className="w-4 h-4 mr-1" />
                                            Visit Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Certificate Card */}
                        {registration.pdf_url && (
                            <div className="bg-gradient-to-br from-background to-surface rounded-2xl shadow-xl p-6 border border-border">
                                <h2 className="text-xl font-bold text-text mb-4">Official Certificate</h2>
                                <p className="text-text-muted mb-4">
                                    Download {registration.dog_name}'s official WCU registration certificate.
                                </p>
                                <a
                                    href={registration.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full bg-buttons text-white px-6 py-3 rounded-lg font-semibold hover:bg-error transition"
                                >
                                    View/Download Certificate
                                </a>
                            </div>
                        )}

                        {/* Share Card */}
                        <div className="bg-gradient-to-br from-background to-surface rounded-2xl shadow-xl p-6 border border-border">
                            <h2 className="text-xl font-bold text-text mb-4">Share the Love</h2>
                            <p className="text-text-muted mb-4">
                                Share {registration.dog_name}'s profile with friends and family!
                            </p>
                            <div className="flex space-x-3">
                                <button className="flex-1 bg-buttons text-white px-4 py-2 rounded-lg font-medium hover:bg-error transition">
                                    Share
                                </button>
                                <button className="flex-1 bg-background text-text px-4 py-2 rounded-lg font-medium hover:bg-border transition">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}