'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Home, Heart } from 'lucide-react';

interface NavigationFooterProps {
    showGiveBackLink?: boolean;
    leftLink?: {
        href: string;
        text: string;
    };
    rightLink?: {
        href: string;
        text: string;
    };
    className?: string;
}

export default function NavigationFooter({
    showGiveBackLink = true,
    leftLink = { href: '/', text: 'Return to Homepage' },
    rightLink = { href: '/how-we-give-back', text: 'How We Give Back' },
    className = ''
}: NavigationFooterProps) {
    return (
        <div className={`mt-12 ${className}`}>
            {/* Modern separator line */}
            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-background px-4 text-sm text-text-muted">
                        Continue Exploring
                    </span>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Left Link */}
                <Link
                    href={leftLink.href}
                    className="group flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-all hover:gap-3"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="flex items-center gap-2">
                        <Home className="w-4 h-4 opacity-70" />
                        {leftLink.text}
                    </span>
                </Link>

                {/* Optional: Center decorative element on desktop */}
                <div className="hidden sm:block">
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                        <div className="w-1 h-1 rounded-full bg-accent/30"></div>
                        <div className="w-1 h-1 rounded-full bg-accent/30"></div>
                        <div className="w-1 h-1 rounded-full bg-accent/30"></div>
                    </div>
                </div>

                {/* Right Link */}
                {showGiveBackLink && (
                    <Link
                        href={rightLink.href}
                        className="group flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-all hover:gap-3"
                    >
                        <span className="flex items-center gap-2">
                            <Heart className="w-4 h-4 opacity-70" />
                            {rightLink.text}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>

            {/* Optional: Quick links row */}
            <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-border/30">
                <Link href="/register" className="text-xs text-text-muted hover:text-accent transition-colors">
                    Register Your Dog
                </Link>
                <Link href="/dogs" className="text-xs text-text-muted hover:text-accent transition-colors">
                    Find a Dog
                </Link>
                <Link href="/about" className="text-xs text-text-muted hover:text-accent transition-colors">
                    About WCU
                </Link>
            </div>
        </div>
    );
}