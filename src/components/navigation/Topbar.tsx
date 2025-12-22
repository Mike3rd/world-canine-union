import Link from 'next/link';
import Navbar from './Navbar';

export default function Topbar() {
    return (
        <header className="border-b border-border bg-header-bg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo - EXACTLY matching your current layout */}
                    <Link
                        href="/"
                        className="inline-block hover:opacity-80 transition-opacity"
                    >
                        <div className="flex items-center gap-1">
                            {/* Logo Image with your exact dimensions */}
                            <img
                                src="\images\wcu-logo-nav.png"
                                alt="WCU Logo"
                                className="h-14 w-auto"
                                style={{
                                    height: '56px', // 256x285 ratio means width will be ~50px
                                    width: 'auto'
                                }}
                            />

                            {/* Title with your exact styling */}
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-logo font-bold text-header-text pt-2">
                                World Canine Union
                            </h1>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <Navbar />
                </div>
            </div>
        </header>
    );
}