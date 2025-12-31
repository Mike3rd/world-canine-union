// components/how-we-give-back/CTASection.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <div className="text-center">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                    Join the Movement
                </h3>
                <p className="text-text-muted text-lg mb-6 max-w-2xl mx-auto">
                    Register your dog today and become part of a community that celebrates
                    our canine companions while helping animals in need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center bg-buttons hover:bg-buttons-hover text-white font-heading font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                        Register Your Dog
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <Link
                        href="/shelters"
                        className="inline-flex items-center justify-center bg-surface hover:bg-primary/5 text-primary font-heading font-medium px-6 py-3 rounded-lg border border-border transition-colors"
                    >
                        View Shelter Directory
                    </Link>
                </div>
                <p className="text-sm text-text-muted mt-6">
                    Questions about our giving program?{" "}
                    <Link href="/contact" className="text-accent hover:text-accent/80 font-medium">
                        Contact our team
                    </Link>
                </p>
            </div>
        </div>
    );
}