import Link from 'next/link';
import Navbar from './Navbar';
import Image from 'next/image';

export default function Topbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-header-bg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo - EXACTLY matching your current layout */}
                    <Link
                        href="/"
                        className="inline-block hover:opacity-80 transition-opacity"
                    >
                        <div className="flex items-center gap-1">
                            {/* Logo Image with your exact dimensions */}
                            <Image
                                src="/images/wcu-logo-nav.png"
                                alt="WCU Logo"
                                width={100}  // ACTUAL image width (from the error: "100x111")
                                height={111} // ACTUAL image height
                                className="h-14 w-auto" // This will scale it down to 56px height
                                priority
                            />

                            {/* Title with your exact styling */}
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-logo font-bold text-header-text pt-0">
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