import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Topbar from "@/components/navigation/Topbar";
import Footer from "@/components/navigation/Footer";
import ChatWidget from "@/components/ChatWidget";
import localFont from 'next/font/local';

// Configure fonts

const merriweather = localFont({
  // Update the path and filename to match your actual file
  src: './fonts/Merriweather/merriweather-regular-webfont.ttf',
  variable: '--font-merriweather',
  weight: '400 700', // Adjust if you have a variable font file
  display: 'swap',
});

const oxanium = localFont({
  src: './fonts/Oxanium/Oxanium-VariableFont_wght.ttf', // <-- Confirm exact filename
  variable: '--font-oxanium',
  weight: '100 900',
  display: 'swap',
});


const inter = localFont({
  src: '/fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter',
  weight: '100 900', // Specify the supported weight range
  display: 'swap',
});


const ibmPlexSans = localFont({
  src: '/fonts/IBM-Plex-Sans/IBMPlexSans-VariableFont_wdth,wght.ttf',
  variable: '--font-ibm-plex-sans',
  weight: '100 700',
  display: 'swap',
});


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
        url: "https://worldcanineunion.org/images/wcu-logo-1200.png",
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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable} ${oxanium.variable} ${merriweather.variable} `}>
      <body className="min-h-screen bg-background text-text font-body">
        <StructuredData />
        <div className="flex flex-col min-h-screen">
          <Topbar /> {/* Replaces old header */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
