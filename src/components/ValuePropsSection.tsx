// src/components/ValuePropsSection.tsx
import Link from "next/link";
import { Globe, Heart, Users } from "lucide-react";

export default function ValuePropsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">
          Why Join the World Canine Union?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Focus on INCLUSION */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-primary text-surface rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
              A Registry for All Dogs
            </h3>
            <p className="text-text-muted font-body leading-relaxed">
              We celebrate purebreds, mixed breeds, rescues, and every unique combination in between. No dog needs "perfect" papers.
            </p>
          </div>

          {/* Card 2: Focus on STORY */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-secondary text-surface rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
              Celebrate Their Story
            </h3>
            <p className="text-text-muted font-body leading-relaxed">
              From joyful living profiles to beautiful memorial tributes—honor your dog's complete journey.
            </p>
          </div>

          {/* Card 3: Focus on COMMUNITY */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-accent text-surface rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
              Join a Movement
            </h3>
            <p className="text-text-muted font-body leading-relaxed">
              Be part of a global community redefining what makes a dog special.
            </p>
          </div>
        </div>

        {/* CTA to Next Section */}
        <div className="text-center pt-12">
          <p className="text-xl font-body2 text-text-muted mb-6 max-w-2xl mx-auto">
            Ready to see exactly what your registration includes?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#details"
              className="bg-buttons text-surface px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl min-w-[200px] text-center"
            >
              See What's Included
            </a>
          </div>

          <p className="mt-6 text-sm font-body text-text-muted">
            Scroll down to learn about membership details
          </p>
        </div>
      </div>
    </section>
  );
}