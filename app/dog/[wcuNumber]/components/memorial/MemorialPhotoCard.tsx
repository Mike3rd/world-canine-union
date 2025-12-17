// app/dog/[wcuNumber]/components/memorial/MemorialPhotoCard.tsx
import Image from 'next/image'
import { Ribbon } from 'lucide-react'

interface MemorialPhotoCardProps {
    photoUrl: string | null
    dogName: string
}



export default function MemorialPhotoCard({ photoUrl, dogName }: MemorialPhotoCardProps) {
    return (
        <div className="rounded-2xl shadow-xl overflow-hidden border relative bg-memorial-surface border-memorial-border">
            {/* Memorial Ribbon */}
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center px-3 py-1 rounded-full bg-memorial-accent text-white">
                    <Ribbon className="w-4 h-4 mr-1" />
                    <span className="text-sm font-semibold">In Memory</span>
                </div>
            </div>

            <div className="relative bg-gradient-to-br from-memorial-gradient to-memorial-gradient-end">
                {photoUrl ? (
                    <div className="relative w-full pt-[133.5%]">
                        <Image
                            src={photoUrl}
                            alt={`In memory of ${dogName}`}
                            fill
                            className="object-contain p-4 opacity-90"
                            sizes="(max-width: 768px) 100vw, 412px"
                            priority
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                ) : (
                    <div className="relative pt-[133.5%]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-8xl mb-4">🐕‍🦺</div>
                                <p className="font-semibold text-memorial-text">
                                    In Loving Memory
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}