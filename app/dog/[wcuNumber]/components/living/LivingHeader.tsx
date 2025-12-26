// app/dog/[wcuNumber]/components/living/LivingHeader.tsx
import { Sparkles, CalendarDays, VenusAndMars, Award, Star } from 'lucide-react'
import HeartIcon from '../HeartIcon'

interface LivingHeaderProps {
    dogName: string
    registrationNumber: string
    gender: string | null
    age: string | null
    isSpotlight?: boolean
    spotlightReason?: string | null
}

export default function LivingHeader({
    dogName,
    registrationNumber,
    gender,
    age,
    isSpotlight = false,
    spotlightReason = null
}: LivingHeaderProps) {
    return (
        <div className="bg-dog-header-bg text-dog-header-text">
            {/* SPOTLIGHT BANNER - Above header */}
            {isSpotlight && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-3">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center gap-2">
                            <Award className="w-4 h-4 text-white flex-shrink-0" />
                            <span className="text-sm font-bold text-white text-center">
                                WCU Spotlight Dog • {spotlightReason || 'Featured'}
                            </span>
                            <Star className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-auto">
                        {/* Heart + Name - Stack on mobile */}
                        <div className="flex flex-col sm:flex-row items-center mb-3 gap-3">
                            <HeartIcon className="w-12 h-12 sm:w-15 sm:h-15" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left">
                                {dogName}
                            </h1>
                        </div>

                        {/* WCU details - Stack on mobile */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-dog-border">
                            {/* First row: WCU Number & Gender */}
                            <div className="flex items-center space-x-1 text-memorial-border">
                                <span className="flex items-center">
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    {registrationNumber}
                                </span>
                                <VenusAndMars className="w-4 h-4 mr-1 ml-1" />
                                {gender && (
                                    <span className="capitalize">{gender}</span>
                                )}
                            </div>

                            {/* Age - Only show if exists */}
                            {age && (
                                <div className="flex items-center">
                                    <CalendarDays className="w-4 h-4 mr-1" />
                                    <span>{age}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right side badge */}
                    <div className="mt-4 md:mt-0">
                        <a
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-dog-accent">✪</span>
                                <div className="text-sm font-semibold tracking-wider uppercase">
                                    World's Best Dog
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}