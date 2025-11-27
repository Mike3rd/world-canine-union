import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Canine Union - Global Registry for all Other Dogs",
  description:
    "The official global registry celebrating one-of-a-kind dogs. Join our community today!",
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
                <div>
                  <h1 className="text-2xl font-heading font-bold text-header-text">
                    World Canine Union
                  </h1>
                  <p className="text-sm text-header-text/80 font-body2">
                    Global Registry for all the other dogs
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
