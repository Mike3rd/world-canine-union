// app/dog/[wcuNumber]/components/memorial/MemorialRainbowBridge.tsx
import { Heart, Calendar, Home, Cloud } from 'lucide-react'

interface MemorialRainbowBridgeProps {
    dogName: string
    birthDate: string | null
    gotchaDate: string | null
    memorialDate: string | null
    memorialCause: string | null
    memorialMessage: string | null
}

export default function MemorialRainbowBridge({
    dogName,
    birthDate,
    gotchaDate,
    memorialDate,
    memorialCause,
    memorialMessage
}: MemorialRainbowBridgeProps) {

    const formatDate = (dateString: string | null) => {
        if (!dateString) return null
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="rounded-2xl shadow-xl overflow-hidden border" style={{
            backgroundColor: 'var(--color-memorial-surface)',
            borderColor: 'var(--color-memorial-border)'
        }}>
            {/* Rainbow Bridge Header */}
            <div className="p-6 memorial-rainbow-gradient text-memorial-primary">
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
                    <h3 className="text-xl font-semibold mb-6 flex items-center" style={{ color: 'var(--color-memorial-text)' }}>
                        <Heart className="w-5 h-5 mr-2" style={{ color: 'var(--color-memorial-accent)' }} />
                        {dogName}'s Life Journey
                    </h3>

                    <div className="space-y-6">
                        {birthDate && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{
                                    backgroundColor: 'var(--color-memorial-background)',
                                    color: 'var(--color-memorial-accent)'
                                }}>
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium" style={{ color: 'var(--color-memorial-text)' }}>Birth</p>
                                    <p className="font-body" style={{ color: 'var(--color-memorial-text-muted)' }}>
                                        Born on {formatDate(birthDate)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {gotchaDate && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{
                                    backgroundColor: 'var(--color-memorial-background)',
                                    color: 'var(--color-memorial-accent)'
                                }}>
                                    <Home className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium" style={{ color: 'var(--color-memorial-text)' }}>Gotcha Day</p>
                                    <p className="font-body" style={{ color: 'var(--color-memorial-text-muted)' }}>
                                        Found their forever home on {formatDate(gotchaDate)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {memorialDate && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 memorial-rainbow-gradient">
                                    <span className="text-white">🌈</span>
                                </div>
                                <div>
                                    <p className="font-medium" style={{ color: 'var(--color-memorial-text)' }}>Rainbow Bridge</p>
                                    <p className="font-body" style={{ color: 'var(--color-memorial-text-muted)' }}>
                                        Crossed the Rainbow Bridge on {formatDate(memorialDate)}
                                        {memorialCause && `, ${memorialCause.toLowerCase()}`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Memorial Message */}
                {memorialMessage && (
                    <div className="p-6 rounded-xl border" style={{
                        backgroundColor: 'var(--color-memorial-background)',
                        borderColor: 'var(--color-memorial-border)'
                    }}>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: 'var(--color-memorial-text)' }}>
                            <Heart className="w-4 h-4 mr-2" style={{ color: 'var(--color-memorial-accent)' }} />
                            In Memory
                        </h4>
                        <blockquote className="font-body italic" style={{ color: 'var(--color-memorial-text-muted)' }}>
                            "{memorialMessage}"
                        </blockquote>
                    </div>
                )}

                {/* Rainbow Bridge Poem */}
                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-memorial-border)' }}>
                    <p className="text-center font-body italic" style={{ color: 'var(--color-memorial-text-muted)' }}>
                        "Just this side of heaven is a place called Rainbow Bridge.<br />
                        When an animal dies, they cross the Rainbow Bridge<br />
                        where they wait to be reunited with their loved ones once more."
                    </p>
                </div>
            </div>
        </div>
    )
}