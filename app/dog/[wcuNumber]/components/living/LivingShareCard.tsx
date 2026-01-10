'use client';

import { useState } from 'react';
import { Share2, Link, Check } from 'lucide-react';

interface LivingShareCardProps {
    dogName: string;
    wcuNumber: string;
}

export default function LivingShareCard({ dogName, wcuNumber }: LivingShareCardProps) {
    const [copied, setCopied] = useState(false);

    // Safely build the URL on the client side
    const buildProfileUrl = () =>
        `${window.location.origin}/dog/${wcuNumber}`;

    // Share content (kept centralized & editable)
    const shareTitle = `${dogName}'s WCU Profile`;
    const shareText = `Check out ${dogName}'s profile on the World Canine Union registry!`;

    // 1. UNIVERSAL SHARE BUTTON LOGIC (no duplication, no missing URL)
    const handleShareClick = async () => {
        const profileUrl = buildProfileUrl();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    // Embed URL directly for reliability across all share targets
                    text: `🐾 ${shareText}\n\n${profileUrl}`,
                    // ❌ do NOT pass `url`
                });
                return;
            } catch {
                // User cancelled share
            }
        }

        // Email fallback (explicit URL required)
        const subject = encodeURIComponent(shareTitle);
        const body = encodeURIComponent(
            `${shareText}\n\n${profileUrl}`
        );

        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    // 2. COPY LINK BUTTON LOGIC (unchanged, already solid)
    const handleCopyClick = async () => {
        const profileUrl = buildProfileUrl();
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
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
        <div className="bg-gradient-to-br from-dog-background to-dog-surface rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-dog-text mb-4">
                Share the Love
            </h2>

            <p className="text-dog-text-muted mb-4 font-body">
                Share {dogName}'s profile with friends and family!
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                {/* PRIMARY SHARE BUTTON */}
                <button
                    onClick={handleShareClick}
                    className="flex items-center justify-center gap-2 flex-1 bg-dog-buttons text-white px-4 py-3 rounded-lg font-medium hover:bg-dog-error transition cursor-pointer"
                >
                    <Share2 size={20} />
                    Share
                </button>

                {/* COPY LINK BUTTON */}
                <button
                    onClick={handleCopyClick}
                    className={`flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-lg font-medium transition border cursor-pointer ${copied
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-dog-background text-dog-text hover:bg-dog-border border-dog-border'
                        }`}
                >
                    {copied ? (
                        <Check size={20} className="text-green-700" />
                    ) : (
                        <Link size={20} />
                    )}
                    {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
            </div>
        </div>
    );
}
