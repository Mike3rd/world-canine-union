// app/dog/[wcuNumber]/components/living/LivingHeader.tsx
import { Sparkles, CalendarDays, VenusAndMars, Trophy } from 'lucide-react'
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
                <div
                    className="border-y-4 py-6 relative overflow-hidden"
                    style={{
                        borderColor: 'var(--color-spotlight-border)',
                        background: 'linear-gradient(to right, var(--color-spotlight-bg-from), var(--color-spotlight-bg-to))'
                    }}
                >
                    {/* Diagonal lines */}
                    <div
                        className="absolute -left-4 top-0 w-8 h-full transform -skew-x-12"
                        style={{ backgroundColor: 'var(--color-spotlight-primary-20)' }}
                    ></div>
                    <div
                        className="absolute -right-4 top-0 w-8 h-full transform skew-x-12"
                        style={{ backgroundColor: 'var(--color-spotlight-primary-20)' }}
                    ></div>

                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-3 mb-2">
                                <span
                                    className="text-2xl font-black tracking-wide"
                                    style={{
                                        color: 'var(--color-spotlight-text-primary)',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(var(--color-spotlight-primary-rgb), 0.15)',
                                        background: 'linear-gradient(135deg, var(--color-spotlight-primary) 0%, var(--color-spotlight-primary-dark) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    💥SPOTLIGHT DOG💥
                                </span>
                            </div>

                            {/* Text box with CSS variable border */}
                            <div
                                className="text-lg font-medium mt-3 px-4 py-3 rounded-xl shadow-sm max-w-5xl mx-auto"
                                style={{
                                    color: 'var(--color-spotlight-text-primary)',
                                    backgroundColor: 'var(--color-spotlight-textbox-bg)',
                                    border: '1px solid var(--color-spotlight-primary-30)'
                                }}
                            >
                                "{spotlightReason || 'Recognized as an extraordinary canine with remarkable qualities and positive community impact'}"
                            </div>

                            {/* Subtitle with accent color */}
                            <div className="flex items-center justify-center gap-2 mt-3 text-sm"
                                style={{ color: 'var(--color-spotlight-text-accent)' }}>
                                <Trophy className="w-4 h-4 flex-shrink-0" />
                                <span className="tracking-wide">World Canine Union Recognition</span>
                            </div>
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