'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Desktop navigation items (shown in navbar)
    const desktopNavItems = [
        { label: 'About Us', href: '/about' },
        { label: 'Register', href: '/register' },
        { label: 'Contact', href: '/contact' },
    ];

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
                {/* Desktop Links - White text stays white on hover */}
                {desktopNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-colors
              ${pathname === item.href
                                ? 'bg-buttons text-white'  // Active state
                                : 'text-header-text hover:text-header-text hover:bg-white/20'  // White stays white on hover
                            }
            `}
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Desktop Hamburger - Still shows on desktop */}
                <button
                    onClick={toggleMobileMenu}
                    className={`
            flex items-center justify-center rounded-lg p-2
            hover:bg-white/20 transition-colors
            ${isMobileMenuOpen ? 'bg-white/20' : ''}
          `}
                    aria-label="Open menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <svg
                        className="h-5 w-5 text-header-text"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                    <span className="ml-2 text-sm text-header-text">Menu</span>
                </button>
            </nav>

            {/* Mobile Navigation (hamburger only) */}
            <div className="flex items-center md:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="rounded-lg p-2 hover:bg-white/20 transition-colors"
                    aria-label="Open mobile menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? (
                        // X icon when open
                        <svg
                            className="h-6 w-6 text-header-text"
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
                    ) : (
                        // Hamburger icon when closed
                        <svg
                            className="h-6 w-6 text-header-text"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Component - Now works on desktop too */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
            />
        </>
    );
}