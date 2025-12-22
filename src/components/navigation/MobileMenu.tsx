'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Menu items
    const menuItems = [
        { label: 'Update Form', href: '/request-update' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Browse Dogs by Breed', href: '/dogs' },
        { label: 'Find Shelters', href: '/shelters' },
        { label: 'About Us', href: '/about' },
        { label: 'How We Give Back', href: '/giving' },
        {
            label: 'Admin Login',
            href: '/admin',
            className: 'text-text-muted text-sm border-t border-border mt-2 pt-2 md:pt-4 md:mt-4'
        },
    ];

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay with backdrop blur */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Menu panel - Larger width on desktop */}
            <div className="fixed right-0 top-0 z-50 h-full w-72 md:w-96">
                <div className="flex h-full flex-col bg-surface shadow-xl">
                    {/* Header - Larger on desktop */}
                    <div className="flex items-center justify-between border-b border-border p-4 md:p-6">
                        <h3 className="font-heading text-lg md:text-xl font-semibold text-primary">
                            World Canine Union
                        </h3>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 hover:bg-gray-100"
                            aria-label="Close menu"
                        >
                            <svg
                                className="h-6 w-6 md:h-7 md:w-7 text-text"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* SCROLLABLE NAV LINKS - Larger text on desktop */}
                    <div className="flex-1 overflow-y-auto py-2 md:py-4">
                        <nav className="space-y-1 md:space-y-2 px-2 md:px-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    flex items-center rounded-lg px-3 py-3 md:px-4 md:py-4
                    text-sm md:text-base font-medium
                    transition-colors hover:bg-gray-50
                    ${pathname === item.href ? 'bg-gray-50 text-accent' : 'text-text'}
                    ${item.className || ''}
                  `}
                                    onClick={onClose}
                                >
                                    <span>{item.label}</span>
                                    {item.href === '/admin' && (
                                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs md:text-sm text-text-muted">
                                            Admin
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Additional info section - Larger on desktop */}
                        <div className="mt-6 md:mt-8 px-4 md:px-6">
                            <div className="rounded-lg bg-gray-50 p-4 md:p-5">
                                <h4 className="font-heading text-sm md:text-base font-semibold text-primary mb-2 md:mb-3">
                                    Need Help?
                                </h4>
                                <p className="text-xs md:text-sm text-text-muted">
                                    Contact us for assistance with registration, updates, or general inquiries.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Larger on desktop */}
                    <div className="border-t border-border p-4 md:p-6">
                        <p className="text-xs md:text-sm text-text-muted text-center">
                            © {new Date().getFullYear()} World Canine Union
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}