// app/dog/[wcuNumber]/components/memorial/MemorialPhotoCard.tsx
import Image from 'next/image'
import { Ribbon } from 'lucide-react'

interface MemorialPhotoCardProps {
    photoUrl: string | null
    dogName: string
}

export default function MemorialPhotoCard({ photoUrl, dogName }: MemorialPhotoCardProps) {
    const IMAGE_WIDTH = 412;
    const IMAGE_HEIGHT = 550;
    const PADDING = 16; // p-4 = 16px

    return (
        <div
            className="rounded-2xl shadow-xl overflow-hidden relative bg-memorial-surface mx-auto"
            style={{
                width: IMAGE_WIDTH + (PADDING * 2),
                maxWidth: '100%'
            }}
        >
            {/* Memorial Ribbon */}
            <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center px-3 py-1 rounded-full bg-memorial-accent text-white">
                    <Ribbon className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">In Memory</span>
                </div>
            </div>

            <div className="relative memorial-rainbow-gradient p-4">
                {photoUrl ? (
                    <Image
                        src={photoUrl}
                        alt={`In memory of ${dogName}`}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        className="w-full h-auto opacity-90"
                        priority
                    />
                ) : (
                    <div
                        style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
                        className="flex items-center justify-center"
                    >
                        <div className="text-center">
                            <div className="text-8xl mb-4">🐕‍🦺</div>
                            <p className="font-semibold text-memorial-text">
                                In Loving Memory
                            </p>
                        </div>
                    </div>
                )}




                {/* Overlay */}
                <div className="absolute inset-4 bg-black/10 pointer-events-none"></div>
            </div>
        </div>
    )
}