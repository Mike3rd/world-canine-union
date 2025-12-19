// app/dog/[wcuNumber]/components/memorial/MemorialRainbowBridge.tsx
import { Heart, Calendar, Home, Cloud } from 'lucide-react'



interface MemorialRainbowBridgeProps {
    dogName: string
    birthDate: string | null
    gotchaDate: string | null
    memorialDate: string | null
    memorialMessage: string | null
    location: string | null
    shelterName: string | null
    shelterState: string | null
}

export default function MemorialRainbowBridge({
    dogName,
    birthDate,
    gotchaDate,
    memorialDate,
    memorialMessage,
    location,
    shelterName,
    shelterState
}: MemorialRainbowBridgeProps) {

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Add these helper functions in your component
    const calculateAge = (birthDate: string, memorialDate: string): string => {
        const birth = new Date(birthDate);
        const memorial = new Date(memorialDate);

        let years = memorial.getFullYear() - birth.getFullYear();
        let months = memorial.getMonth() - birth.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
        if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
        return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
    };

    const calculateTimeTogether = (gotchaDate: string, memorialDate: string): string => {
        const gotcha = new Date(gotchaDate);
        const memorial = new Date(memorialDate);

        let years = memorial.getFullYear() - gotcha.getFullYear();
        let months = memorial.getMonth() - gotcha.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
        if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
        return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
    };

    return (
        <div className="rounded-2xl shadow-xl overflow-hidden border bg-memorial-surface border-memorial-border">
            {/* Rainbow Bridge Header */}
            <div className="p-6 memorial-rainbow-gradient text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Cloud className="w-6 h-6 mr-3" />
                        <div>
                            <h2 className="text-2xl font-bold">Rainbow Bridge</h2>
                            <p className="opacity-90">A place of peace and beauty</p>
                        </div>
                    </div>
                    <div className="text-3xl">🌈</div>
                </div>
            </div>

            <div className="p-6">
                {/* Life Journey Timeline */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center text-memorial-text">
                        <Heart className="w-5 h-5 mr-2 text-memorial-accent" />
                        {dogName}'s Life Journey
                    </h3>

                    <div className="space-y-6">
                        {/* Birth */}
                        {birthDate && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-memorial-background text-memorial-accent">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-memorial-text">Birth</p>
                                    <p className="font-body text-memorial-text-muted">
                                        Born on {formatDate(birthDate)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Rescued From (location) */}
                        {location && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-memorial-background text-memorial-accent">
                                    <span className="text-lg">🏥</span>
                                </div>
                                <div>
                                    <p className="font-medium text-memorial-text">Rescued From</p>
                                    <p className="font-body text-memorial-text-muted">
                                        Found in {location}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Animal Rescue/Shelter */}
                        {(shelterName || shelterState) && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-memorial-background text-memorial-accent">
                                    <span className="text-lg">🏠</span>
                                </div>
                                <div>
                                    <p className="font-medium text-memorial-text">
                                        {shelterName ? 'Rescue/Shelter' : 'Rescue Location'}
                                    </p>
                                    <p className="font-body text-memorial-text-muted">
                                        {shelterName && shelterState
                                            ? `${shelterName}, ${shelterState}`
                                            : shelterName || shelterState
                                        }
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Gotcha Day */}
                        {gotchaDate && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-memorial-background text-memorial-accent">
                                    <Home className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-memorial-text">Gotcha Day</p>
                                    <p className="font-body text-memorial-text-muted">
                                        Found their forever home on {formatDate(gotchaDate)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Rainbow Bridge */}
                        {memorialDate && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 memorial-rainbow-gradient">
                                    <span className="text-white">🌈</span>
                                </div>
                                <div>
                                    <p className="font-medium text-memorial-text">Rainbow Bridge</p>
                                    <p className="font-body text-memorial-text-muted">
                                        Crossed the Rainbow Bridge on {formatDate(memorialDate)}
                                    </p>

                                    {/* Age at passing */}
                                    {birthDate && memorialDate && (
                                        <p className="text-sm mt-1 text-memorial-accent">
                                            Age: {calculateAge(birthDate, memorialDate)}
                                        </p>
                                    )}

                                    {/* Time with family */}
                                    {gotchaDate && memorialDate && (
                                        <p className="text-sm mt-1 text-memorial-accent">
                                            Time with family: {calculateTimeTogether(gotchaDate, memorialDate)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Memorial Message */}
                {memorialMessage && (
                    <div className="p-6 rounded-xl border bg-memorial-background border-memorial-border">
                        <h4 className="font-semibold mb-3 flex items-center text-memorial-text">
                            <Heart className="w-4 h-4 mr-2 text-memorial-accent" />
                            In Memory
                        </h4>
                        <blockquote className="font-body italic text-memorial-text-muted">
                            "{memorialMessage}"
                        </blockquote>
                    </div>
                )}

                {/* Rainbow Bridge Poem */}
                <div className="mt-8 pt-6 border-t border-memorial-border">
                    <p className="text-center font-body italic text-memorial-text-muted">
                        "Just this side of heaven is a place called Rainbow Bridge.<br />
                        When an animal dies, they cross the Rainbow Bridge<br />
                        where they wait to be reunited with their loved ones once more."
                    </p>
                </div>
            </div>
        </div>
    )
}