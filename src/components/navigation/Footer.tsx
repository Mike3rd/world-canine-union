// /components/navigation/Footer.tsx (note lowercase 'n')
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-footer-bg py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-footer-text text-sm">
                <p className="mb-2">
                    World Canine Union — A global mission-driven initiative
                    supporting canine welfare.
                </p>
                <p className="text-footer-text/80">
                    © {currentYear} World Canine Union. All rights reserved.
                </p>
                <p className="sr-only">
                    <a href="/fact-sheet.json">World Canine Union Fact Sheet</a>
                </p>
            </div>
        </footer>
    );
}