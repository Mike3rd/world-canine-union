// app/dog/[wcuNumber]/components/memorial/MemorialHeader.tsx
import { Sparkles, CalendarDays, VenusAndMars, Heart, Trophy } from 'lucide-react'
import HeartIcon from '../HeartIcon'

interface MemorialHeaderProps {
    dogName: string
    registrationNumber: string
    gender: string | null
    gotchaDate: string | null
    memorialDate: string | null
    isSpotlight?: boolean
    spotlightReason?: string | null
}

export default function MemorialHeader({
    dogName,
    registrationNumber,
    gender,
    gotchaDate,
    memorialDate,
    isSpotlight = false,
    spotlightReason = null
}: MemorialHeaderProps) {

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="bg-memorial-header-bg text-memorial-header-text">

            {isSpotlight && (
                <div
                    className="border-y-4 py-6 relative overflow-hidden"
                    style={{
                        borderColor: 'var(--color-memorial-spotlight-border)',
                        background: 'linear-gradient(to right, var(--color-memorial-spotlight-bg-from), var(--color-memorial-spotlight-bg-to))'
                    }}
                >
                    {/* Diagonal lines */}
                    <div
                        className="absolute -left-4 top-0 w-8 h-full transform -skew-x-12"
                        style={{ backgroundColor: 'var(--color-memorial-spotlight-primary-20)' }}
                    ></div>
                    <div
                        className="absolute -right-4 top-0 w-8 h-full transform skew-x-12"
                        style={{ backgroundColor: 'var(--color-memorial-spotlight-primary-20)' }}
                    ></div>

                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-3 mb-2">
                                <span
                                    className="text-2xl font-black tracking-wide"
                                    style={{
                                        color: 'var(--color-memorial-spotlight-text-primary)',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(var(--color-memorial-spotlight-primary-rgb), 0.15)',
                                        background: 'linear-gradient(135deg, var(--color-memorial-spotlight-primary) 0%, var(--color-memorial-spotlight-primary-dark) 100%)',
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
                                    color: 'var(--color-memorial-spotlight-text-primary)',
                                    backgroundColor: 'var(--color-memorial-spotlight-textbox-bg)',
                                    border: '1px solid var(--color-memorial-spotlight-primary-30)'
                                }}
                            >
                                "{spotlightReason || 'Forever remembered for the joy and love brought to our community'}"
                            </div>

                            {/* Subtitle with heart icon */}
                            <div className="flex items-center justify-center gap-2 mt-3 text-sm"
                                style={{ color: 'var(--color-memorial-spotlight-text-accent)' }}>
                                <Heart className="w-4 h-4 flex-shrink-0" />
                                <span className="tracking-wide">Forever in Our Hearts • World Canine Union</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}





            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">

                    <div>
                        {/* Memorial Banner */}
                        <div className="mb-0 text-center md:text-left lg:text-left xl:text-left 2xl:text-left">
                            <div className="inline-flex items-center px-4 py-2 rounded-full mb-2 memorial-rainbow-gradient">
                                <span className="text-lg mr-2">🌈</span>
                                <span className="text-sm font-semibold uppercase tracking-wider text-memorial-header-bg">
                                    In Loving Memory
                                </span>
                            </div>
                        </div>

                        {/* Heart + Name on same line */}
                        <div className="flex flex-col sm:flex-row items-center mb-3 gap-3">
                            <HeartIcon className="w-12 h-12 sm:w-15 sm:h-15" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left">
                                {dogName}
                            </h1>
                        </div>

                        {/* Details */}
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

                            {/* Second row: Date information - only shows if we have dates */}
                            {(gotchaDate || memorialDate) && (
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                                    {/* Show date range if both dates exist */}
                                    {gotchaDate && memorialDate && (
                                        <div className="flex items-center text-memorial-border">
                                            <CalendarDays className="w-4 h-4 mr-1 ml-3" />
                                            <span className="font-medium">
                                                {formatDateRange(gotchaDate, memorialDate)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Show only memorial date if no gotcha date */}
                                    {!gotchaDate && memorialDate && (
                                        <div className="flex items-center text-memorial-accent-light">
                                            <span className="mr-1">🕊️</span>
                                            <span className="font-medium">
                                                {formatDate(memorialDate)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* WCU Seal */}
                    <div className="mt-6 md:mt-0">
                        <a
                            href="/"
                            className="inline-flex items-center px-4 py-2 rounded-full border transition bg-white/10 border-memorial-border text-memorial-header-text hover:bg-white/20"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">✪</span>
                                <div className="text-sm font-semibold tracking-wider uppercase">
                                    WCU Memorial
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper function outside component
function formatDateRange(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startFormatted = start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const endFormatted = end.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return `${startFormatted} - ${endFormatted}`;
}