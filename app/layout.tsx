import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

import HeartIcon from '@/components/HeartIcon';


export const metadata: Metadata = {
  title: "World Canine Union - Global Registry For All Other Dogs",
  description:
    "Soul over Pedigree. The official global registry celebrating one-of-a-kind dogs. Join our community today!",
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
    title: "World Canine Union – Global Registry For All Other Dogs",
    description:
      "Soul over Pedigree. The official global registry celebrating one-of-a-kind dogs. Join our community today!",
    url: "https://worldcanineunion.org",
    siteName: "World Canine Union",
    images: [
      {
        url: "https://worldcanineunion.org/images/wcu-logo-nav-1200.png",
        width: 1200,
        height: 1200,
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
                <div className="flex items-center gap-1">
                  {/* Fixed height, auto width maintains your 256x285 ratio */}
                  <img
                    src="\images\wcu-logo-nav.png"
                    alt="WCU Logo"
                    className="h-14 w-auto"
                    style={{
                      height: '56px', // 256x285 ratio means width will be ~50px
                      width: 'auto'
                    }}
                  />

                  <h1 className="text-4xl font-logo font-bold text-header-text">
                    World Canine Union
                  </h1>
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
              <p className="sr-only">
                <a href="/fact-sheet.json">World Canine Union Fact Sheet</a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
