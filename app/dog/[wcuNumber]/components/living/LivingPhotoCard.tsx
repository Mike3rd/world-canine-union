// app/dog/[wcuNumber]/components/living/LivingPhotoCard.tsx
import Image from 'next/image'

interface LivingPhotoCardProps {
    photoUrl: string | null
    dogName: string
}

export default function LivingPhotoCard({ photoUrl, dogName }: LivingPhotoCardProps) {
    const IMAGE_WIDTH = 412;
    const IMAGE_HEIGHT = 550;
    const PADDING = 16; // p-4 = 16px

    return (
        // Main Card Container: Centered, only as wide as needed
        <div className="bg-dog-surface rounded-2xl shadow-xl overflow-hidden mx-auto"
            style={{
                width: IMAGE_WIDTH + (PADDING * 2),
                maxWidth: '100%' // Shrink on mobile
            }}>

            {/* Padded Area Inside Card */}
            <div className="relative bg-gradient-to-br from-dog-background to-dog-border p-4">

                {/* Simple Image Container */}
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt={dogName}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        className="w-full h-auto" // Makes it responsive within its fixed container
                        priority
                    />
                ) : (
                    <div style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
                        className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-8xl mb-4">🐕</div>
                            <p className="text-dog-neutral font-semibold">Photo Coming Soon!</p>
                        </div>
                    </div>
                )}

                {/* Photo Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <span className="text-sm font-semibold text-dog-text">Official WCU Photo</span>
                </div>
            </div>
        </div>
    )
}