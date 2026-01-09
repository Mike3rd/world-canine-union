// app/dog/[wcuNumber]/components/memorial/MemorialShareCard.tsx
'use client'

import { useState } from 'react'
import { Share2, Link, Check, Heart, Bookmark } from 'lucide-react'

interface MemorialShareCardProps {
    dogName: string
    wcuNumber: string // <-- Add this prop
}

export default function MemorialShareCard({ dogName, wcuNumber }: MemorialShareCardProps) {
    const [copied, setCopied] = useState(false)

    // Function to build the URL safely on the client
    const buildProfileUrl = () => `${window.location.origin}/dog/${wcuNumber}`
    const shareText = `Remember ${dogName}. Visit their memorial page on the World Canine Union registry.`

    // 1. Universal Share Button Logic
    const handleShareClick = async () => {
        const profileUrl = buildProfileUrl()
        const textWithUrl = `${shareText} ${profileUrl}` // Include URL in text

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `In Memory of ${dogName}`,
                    text: textWithUrl,
                    url: profileUrl,
                })
                return
            } catch (error) {
                // User cancelled share
                console.log('Share cancelled.')
            }
        }
        // Fallback: Open email
        const subject = encodeURIComponent(`In Memory of ${dogName}`)
        const body = encodeURIComponent(textWithUrl)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
    }

    // 2. "Save Tribute" is now "Copy Link"
    const handleCopyClick = async () => {
        const profileUrl = buildProfileUrl()
        try {
            await navigator.clipboard.writeText(profileUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = profileUrl
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="rounded-2xl shadow-xl p-6 border bg-memorial-surface border-memorial-border">
            <h2 className="text-xl font-bold mb-4 text-memorial-text">
                Share Their Legacy
            </h2>
            <p className="font-body mb-6 text-memorial-text-muted">
                Share {dogName}'s memorial page with friends and family
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                {/* Share Page Button */}
                <button
                    className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-lg font-medium transition bg-memorial-buttons text-white hover:opacity-90"
                    onClick={handleShareClick} // <-- CHANGE TO THIS
                >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Page
                </button>

                {/* Copy Link Button (was "Save Tribute") */}
                {/* Copy Link Button - Updated with proper feedback */}
                <button
                    onClick={handleCopyClick}
                    className={`flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-lg font-medium transition border cursor-pointer ${copied
                        ? 'bg-slate-100 text-slate-800 border-slate-300'
                        : 'bg-memorial-background border-memorial-border text-memorial-text hover:bg-memorial-surface'
                        }`}
                >
                    {copied ? <Check className="w-4 h-4 text-slate-700" /> : <Link className="w-4 h-4" />}
                    {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
            </div>

            {/* Light a Virtual Candle section remains separate */}
            <div className="mt-6 pt-6 border-t text-center border-memorial-border">
                <button
                    className="inline-flex items-center text-sm font-medium text-memorial-accent hover:text-memorial-accent-light cursor-pointer"
                    onClick={() => alert('Light candle feature available above')}
                >
                    <Heart className="w-4 h-4 mr-2" />
                    Light a Virtual Candle
                </button>
            </div>
        </div>
    )
}