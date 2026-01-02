// src/components/DetailsSection.tsx
import Link from "next/link";
import {
  FileText,
  Globe,
  Hash,
  Zap,
  Award,
  Trophy,
  Calendar,
  Tag
} from "lucide-react";

export default function DetailsSection() {
  return (
    <section id="details" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-6">
          What Your <span className="text-accent">Registration Includes</span>
        </h2>
        <p className="text-xl font-body2 text-text-muted text-center mb-12 max-w-3xl mx-auto">
          One $25 fee gives your dog permanent recognition and legacy
        </p>

        {/* Horizontal Cards Grid - Updated */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Official Certificate Card */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-primary text-surface rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
              Official Digital Certificate
            </h3>
            <p className="text-text-muted font-body text-sm">
              Beautifully designed certificate for your unique companion, ready to download and print.
            </p>
          </div>

          {/* WCU Number & Recognition */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-500 text-surface rounded-lg flex items-center justify-center mb-4">
              <Hash className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
              Permanent WCU Number
            </h3>
            <p className="text-text-muted font-body text-sm">
              Your dog's unique registration number becomes their permanent ID in our global registry.
            </p>
          </div>

          {/* Combined Digital Legacy & Memorial Card */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all group">
            <div className="relative w-12 h-12 bg-gradient-to-br from-secondary to-accent text-surface rounded-lg flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-accent rounded-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Globe className="w-6 h-6 relative z-10" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-3">
              Digital Legacy & Memorial
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-text-muted font-body text-sm">
                  <span className="font-semibold text-secondary">Living Profile:</span> Personalized webpage with photos and story
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-text-muted font-body text-sm">
                  <span className="font-semibold text-accent">Memorial Tribute:</span> Transforms when needed
                </p>
              </div>
            </div>
          </div>

          {/* Lifetime Membership Card */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-green-500 text-surface rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
              Lifetime Membership
            </h3>
            <p className="text-text-muted font-body text-sm">
              No annual fees—your dog is honored forever in our global registry.
            </p>
          </div>
        </div>

        {/* Bonus CTA */}
        <div className="text-center mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20">
          <p className="text-3xl font-semibold text-primary mb-2">
            Plus: <span className="text-accent">20% of every registration</span> directly supports shelter animals!
          </p>
          <p className="text-text-muted">
            Your celebration helps feed, vaccinate, and care for rescue animals in need
          </p>
        </div>
      </div>

      {/* Final CTA Buttons */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/register"
            className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-xl font-heading font-bold text-lg hover:opacity-90 transition-all shadow-lg"
          >
            Start Registration
          </Link>
          <Link
            href="/faq"
            className="border-2 border-primary text-primary px-10 py-4 rounded-xl font-heading font-bold text-lg hover:bg-primary/5 transition-all"
          >
            View FAQs
          </Link>
        </div>
        <p className="mt-6 font-body2 text-text-muted">
          Join thousands celebrating their unique companions worldwide
        </p>
      </div>
    </section>
  );
}