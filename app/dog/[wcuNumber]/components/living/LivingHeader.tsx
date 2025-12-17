// app/dog/[wcuNumber]/components/living/LivingHeader.tsx
import { Heart, Sparkles } from 'lucide-react'

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            {dogName}
                        </h1>
                        <div className="flex items-center space-x-4 text-dog-border">
                            <span className="flex items-center">
                                <Sparkles className="w-4 h-4 mr-1" />
                                {registrationNumber}
                            </span>
                            {gender && (
                                <span className="capitalize">{gender}</span>
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
    )
}