import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

import HeartIcon from '@/components/HeartIcon';


export const metadata: Metadata = {
  title: "World Canine Union - Global Registry for all Other Dogs",
  description:
    "The official global registry celebrating one-of-a-kind dogs. Join our community today!",
  keywords: [
    "dog registry",
    "rescue organizations and canine welfare initiatives",
    "mixed breed dogs",
    "rescue animals",
    "unique dogs",
    "adopt a dog",
    "dog shows",
    "animal welfare",
    "rescue dogs",
  ],
  openGraph: {
    title: "World Canine Union – Global Registry for all Other Dogs",
    description:
      "More Soul than Pedigree. The official global registry celebrating one-of-a-kind dogs. Join our community today!",
    url: "https://worldcanineunion.org",
    siteName: "World Canine Union",
    images: [
      {
        url: "https://worldcanineunion.org/wcu-logo.png",
        width: 360,
        height: 360,
        alt: "World Canine Union",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {

  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "World Canine Union",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="default">
      {/* default, night, retro, holiday */}
      <body className="min-h-screen bg-background text-text font-body">
        <div className="flex flex-col min-h-screen">
          <header className="border-b border-border bg-header-bg">
            <div className="container mx-auto px-4 py-4">
              <Link
                href="/"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <div className="inline-flex flex-col items-start leading-tight">
                  <h1 className="text-4xl font-logo font-bold text-header-text inline-flex items-center">
                    <HeartIcon className="text-error mr-1 heart-stroke" size={40} />
                    World Canine Union
                  </h1>
                  <p className="text-md text-header-text/80 font-body2 ml-12 -mt-1">
                    Global Registry for all other dogs
                  </p>
                </div>
              </Link>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border bg-footer-bg py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-footer-text text-sm">
              <p>
                World Canine Union — A global mission-driven initiative
                supporting canine welfare.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
