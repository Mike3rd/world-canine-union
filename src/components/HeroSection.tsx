import Link from "next/link";
import { FileText, Globe, Rainbow, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-surface py-20 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <p className="text-2xl font-heading text-primary mb-6 bg-yellow-300 p-1 font-bold m-0">
            Site currently under construction. Registry opens February 1, 2026
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-1">
            Soul over Pedigree &#8212;
          </h1>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
            Global Registry for all other Dogs
          </h1>
          <p className="text-xl md:text-2xl text-text-muted font-body2 max-w-3xl mx-auto mb-8 leading-relaxed">
            The official global registry celebrating one-of-a-kind dogs. Join our community today!
          </p>
        </div>
      </div>
    </section>
  );
}
