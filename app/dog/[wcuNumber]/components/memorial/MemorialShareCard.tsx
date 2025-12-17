// app/dog/[wcuNumber]/components/memorial/MemorialShareCard.tsx
'use client'
import { Share2, Heart, Bookmark } from 'lucide-react'

interface MemorialShareCardProps {
    dogName: string
}

export default function MemorialShareCard({ dogName }: MemorialShareCardProps) {
    return (
        <div className="rounded-2xl shadow-xl p-6 border bg-memorial-surface border-memorial-border">
            <h2 className="text-xl font-bold mb-4 text-memorial-text">
                Share Their Legacy
            </h2>
            <p className="font-body mb-6 text-memorial-text-muted">
                Share {dogName}'s memorial page with friends and family
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-lg font-medium transition bg-memorial-buttons text-white hover:opacity-90"
                    onClick={() => alert('Share feature coming soon')}
                >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Page
                </button>

                <button
                    className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-lg font-medium transition border bg-memorial-background border-memorial-border text-memorial-text hover:bg-memorial-surface"
                    onClick={() => alert('Save feature coming soon')}
                >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save Tribute
                </button>
            </div>

            <div className="mt-6 pt-6 border-t text-center border-memorial-border">
                <button
                    className="inline-flex items-center text-sm font-medium text-memorial-accent hover:text-memorial-accent-light"
                    onClick={() => alert('Light candle feature available above')}
                >
                    <Heart className="w-4 h-4 mr-2" />
                    Light a Virtual Candle
                </button>
            </div>
        </div>
    )
}