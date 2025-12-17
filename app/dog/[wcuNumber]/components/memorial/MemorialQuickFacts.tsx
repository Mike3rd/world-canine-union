// app/dog/[wcuNumber]/components/memorial/MemorialQuickFacts.tsx
import { CalendarDays, Users, Cake, Home, MapPin, Palette, Heart } from 'lucide-react'

interface MemorialQuickFactsProps {
    breedDescription: string | null
    birthDate: string | null
    gotchaDate: string | null
    location: string | null
    dogColor: string | null
    memorialDate: string | null
}

export default function MemorialQuickFacts({
    breedDescription,
    birthDate,
    gotchaDate,
    location,
    dogColor,
    memorialDate
}: MemorialQuickFactsProps) {

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Calculate time with family (gotcha to memorial)
    const calculateTimeWithFamily = (gotcha: string, memorial: string): string => {
        const gotchaDate = new Date(gotcha);
        const memorialDate = new Date(memorial);

        let years = memorialDate.getFullYear() - gotchaDate.getFullYear();
        let months = memorialDate.getMonth() - gotchaDate.getMonth();

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
        if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
        return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
    }

    // Calculate age at passing (if birth date exists)
    const calculateAgeAtPassing = (birth: string, memorial: string): string => {
        const birthDate = new Date(birth);
        const memorialDate = new Date(memorial);

        let years = memorialDate.getFullYear() - birthDate.getFullYear();
        let months = memorialDate.getMonth() - birthDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
        if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
        return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
    }

    return (
        <div className="rounded-2xl shadow-xl p-6 border bg-memorial-surface border-memorial-border">
            <h2 className="text-xl font-bold mb-4 flex items-center text-memorial-text">
                <CalendarDays className="w-5 h-5 mr-2 text-memorial-secondary" />
                Life Details
            </h2>

            <div className="space-y-4">
                {breedDescription && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Users className="w-5 h-5 text-memorial-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-memorial-text-muted">Breed</p>
                            <p className="font-medium font-body text-memorial-text">
                                {breedDescription}
                            </p>
                        </div>
                    </div>
                )}

                {birthDate && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Cake className="w-5 h-5 text-memorial-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-memorial-text-muted">Birth Date</p>
                            <p className="font-medium font-body text-memorial-text">
                                {formatDate(birthDate)}
                            </p>
                        </div>
                    </div>
                )}

                {gotchaDate && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Home className="w-5 h-5 text-memorial-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-memorial-text-muted">Gotcha Day</p>
                            <p className="font-medium font-body text-memorial-text">
                                {formatDate(gotchaDate)}
                            </p>
                        </div>
                    </div>
                )}

                {memorialDate && (
                    <>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8">
                                <Heart className="w-5 h-5 text-memorial-accent" />
                            </div>
                            <div>
                                <p className="text-sm text-memorial-text-muted">Rainbow Bridge</p>
                                <p className="font-medium font-body text-memorial-text">
                                    {formatDate(memorialDate)}
                                </p>
                            </div>
                        </div>

                        {/* Time with Family (calculated) */}
                        {gotchaDate && memorialDate && (
                            <div className="ml-8 pl-4 border-l-2 border-memorial-border">
                                <p className="text-sm text-memorial-text-muted">Time with Family</p>
                                <p className="font-medium font-body text-memorial-accent">
                                    {calculateTimeWithFamily(gotchaDate, memorialDate)}
                                </p>
                            </div>
                        )}

                        {/* Age at Passing (if birth date exists) */}
                        {birthDate && memorialDate && (
                            <div className="ml-8 pl-4 border-l-2 border-memorial-border">
                                <p className="text-sm text-memorial-text-muted">Age</p>
                                <p className="font-medium font-body text-memorial-accent">
                                    {calculateAgeAtPassing(birthDate, memorialDate)}
                                </p>
                            </div>
                        )}
                    </>
                )}

                {location && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <MapPin className="w-5 h-5 text-memorial-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-memorial-text-muted">Rescued From</p>
                            <p className="font-medium font-body text-memorial-text">
                                {location}
                            </p>
                        </div>
                    </div>
                )}

                {dogColor && (
                    <div className="flex items-start">
                        <div className="flex-shrink-0 w-8">
                            <Palette className="w-5 h-5 text-memorial-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-memorial-text-muted">Color</p>
                            <p className="font-medium font-body text-memorial-text">
                                {dogColor}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}