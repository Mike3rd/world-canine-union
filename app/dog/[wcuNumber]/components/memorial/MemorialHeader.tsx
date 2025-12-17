// app/dog/[wcuNumber]/components/memorial/MemorialHeader.tsx
import { Sparkles } from 'lucide-react'
import HeartIcon from '../HeartIcon'

interface MemorialHeaderProps {
    dogName: string
    registrationNumber: string
    gender: string | null
    gotchaDate: string | null
    memorialDate: string | null
}

export default function MemorialHeader({
    dogName,
    registrationNumber,
    gender,
    gotchaDate,
    memorialDate
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                        {/* Memorial Banner */}
                        <div className="mb-4">
                            <div className="inline-flex items-center px-4 py-2 rounded-full mb-2 memorial-rainbow-gradient">
                                <span className="text-lg mr-2">🌈</span>
                                <span className="text-sm font-semibold uppercase tracking-wider text-memorial-header-bg">
                                    In Loving Memory
                                </span>
                            </div>
                        </div>

                        {/* Heart + Name on same line */}
                        <div className="flex items-center mb-2">
                            <HeartIcon className="w-15 h-15 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                {dogName}
                            </h1>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-4 text-memorial-border">
                                <span className="flex items-center">
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    {registrationNumber}
                                </span>
                                {gender && (
                                    <span className="capitalize">{gender}</span>
                                )}
                                {/* Show date range if both dates exist */}
                                {gotchaDate && memorialDate && (
                                    <span className="flex items-center">
                                        <span className="mr-1">🏠</span>
                                        <span className="font-medium">
                                            {formatDateRange(gotchaDate, memorialDate)}
                                        </span>
                                    </span>
                                )}
                                {/* Show only memorial date if no gotcha date */}
                                {!gotchaDate && memorialDate && (
                                    <span className="flex items-center text-memorial-accent-light">
                                        <span className="mr-1">🕊️</span>
                                        <span className="font-medium">
                                            {formatDate(memorialDate)}
                                        </span>
                                    </span>
                                )}
                            </div>
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