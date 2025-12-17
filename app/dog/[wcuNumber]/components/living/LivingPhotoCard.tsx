// app/dog/[wcuNumber]/components/living/LivingPhotoCard.tsx
import Image from 'next/image'

interface LivingPhotoCardProps {
    photoUrl: string | null
    dogName: string
}

export default function LivingPhotoCard({ photoUrl, dogName }: LivingPhotoCardProps) {
    return (
        <div className="bg-dog-surface rounded-2xl shadow-xl overflow-hidden">
            <div className="relative bg-gradient-to-br from-dog-background to-dog-border">
                {photoUrl ? (
                    <div className="relative w-full" style={{ paddingTop: '133.5%' }}>
                        <Image
                            src={photoUrl}
                            alt={dogName}
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
                                <p className="text-dog-neutral font-semibold">Photo Coming Soon!</p>
                            </div>
                        </div>
                    </div>
                )}
                {/* Photo Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <span className="text-sm font-semibold text-dog-text">Official WCU Photo</span>
                </div>
            </div>
        </div>
    )
}