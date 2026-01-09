'use client';

import { useState } from 'react';
import { Share2, Link, Check } from 'lucide-react';

interface LivingShareCardProps {
    dogName: string;
    wcuNumber: string;
}

export default function LivingShareCard({ dogName, wcuNumber }: LivingShareCardProps) {
    const [copied, setCopied] = useState(false);

    // Function to safely build the URL on the client side
    const buildProfileUrl = () => `${window.location.origin}/dog/${wcuNumber}`;

    // 1. UNIVERSAL SHARE BUTTON LOGIC
    const handleShareClick = async () => {
        const profileUrl = buildProfileUrl();
        // Two versions of the text:
        const shortText = `Check out ${dogName}'s profile on the World Canine Union registry!`;
        const textWithUrl = `${shortText} ${profileUrl}`; // Has URL for fallback

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${dogName}'s WCU Profile`,
                    text: textWithUrl, // <-- NOW INCLUDES URL for email clients
                    url: profileUrl,
                });
                return;
            } catch (error) {
                console.log('Share cancelled.');
            }
        }
        // Fallback (for browsers without Web Share API)
        const subject = encodeURIComponent(`${dogName}'s WCU Profile`);
        const body = encodeURIComponent(textWithUrl);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    // 2. COPY LINK BUTTON LOGIC
    const handleCopyClick = async () => {
        const profileUrl = buildProfileUrl();
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = profileUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="bg-gradient-to-br from-dog-background to-dog-surface rounded-2xl shadow-xl p-6 border border-dog-border">
            <h2 className="text-xl font-bold text-dog-text mb-4">Share the Love</h2>
            <p className="text-dog-text-muted mb-4 font-body">
                Share {dogName}'s profile with friends and family!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                {/* PRIMARY SHARE BUTTON */}
                <button
                    onClick={handleShareClick}
                    className="flex items-center justify-center gap-2 flex-1 bg-dog-buttons text-white px-4 py-3 rounded-lg font-medium hover:bg-dog-error transition cursor-pointer"
                >
                    <Share2 size={20} />Share {/* No space or line break between /> and text */}
                </button>
                {/* COPY LINK BUTTON */}
                <button
                    onClick={handleCopyClick}
                    className={`flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-lg font-medium transition border cursor-pointer ${copied
                        ? 'bg-green-100 text-green-800 border-green-300'
                        : 'bg-dog-background text-dog-text hover:bg-dog-border border-dog-border'
                        }`}
                >
                    {copied ? <Check size={20} className="text-green-700" /> : <Link size={20} />}
                    {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
            </div>
        </div>
    );
}