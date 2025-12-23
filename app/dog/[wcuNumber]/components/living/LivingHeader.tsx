// app/dog/[wcuNumber]/components/living/LivingHeader.tsx
import { Sparkles, CalendarDays, VenusAndMars } from 'lucide-react'
import HeartIcon from '../HeartIcon'

interface LivingHeaderProps {
    dogName: string
    registrationNumber: string
    gender: string | null
    age: string | null
}

export default function LivingHeader({
    dogName,
    registrationNumber,
    gender,
    age
}: LivingHeaderProps) {
    return (
        <div className="bg-dog-header-bg text-dog-header-text">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                        {/* Heart + Name on same line */}
                        <div className="flex items-center mb-2"> {/* ← Flex row for heart + name */}
                            <HeartIcon className="w-15 h-15 mr-3" /> {/* Adjust size as needed */}
                            <h1 className="text-4xl md:text-5xl font-bold">
                                {dogName}
                            </h1>
                        </div>

                        {/* WCU number, gender, age on next line */}
                        <div className="flex items-center justify-center md:justify-start space-x-4 text-dog-border">
                            <span className="flex items-center">
                                <Sparkles className="w-4 h-4 mr-1" />
                                {registrationNumber}
                            </span>
                            <VenusAndMars className="w-4 h-4 mr-1 ml-1" />
                            {gender && (
                                <span className="capitalize">{gender}</span>
                            )}
                            <CalendarDays className="w-4 h-4 mr-1 ml-3" />
                            {age && (

                                <span>{age}</span>
                            )}
                        </div>
                    </div>
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