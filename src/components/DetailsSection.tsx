import Link from "next/link";
import {
  FileText,
  Globe,
  Rainbow,
  Zap,
  Award,
  Trophy,
  Calendar,
  Tag
} from "lucide-react";

export default function DetailsSection() {
  return (
    <section className="py-16 bg-surface">
      {/* Two-Column Content - EQUAL HEIGHT */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-6">
          Your <span className="text-accent">One-Time $25 Fee</span> Includes:
        </h2>
        <p className="text-xl font-body2 text-text-muted text-center mb-12 max-w-3xl mx-auto">
          Everything you need to celebrate your dog&apos;s unique story and legacy
        </p>

        {/* Horizontal Cards Grid */}
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

          {/* Combined Digital Legacy & Memorial Card */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all group">
            <div className="relative w-12 h-12 bg-gradient-to-br from-secondary to-accent text-surface rounded-lg flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <Globe className="w-6 h-6 relative z-10" />
              <Rainbow className="w-4 h-4 absolute -bottom-1 -right-1 text-accent" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-3">
              Digital Legacy & Memorial
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-text-muted font-body text-sm">
                  <span className="font-semibold text-secondary">Living Profile:</span> Personalized webpage with photos, story, and biography
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5 flex-shrink-0"></div>
                <p className="text-text-muted font-body text-sm">
                  <span className="font-semibold text-accent">Memorial Tribute:</span> Transforms into a loving memorial when the time comes
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-text-muted/80 italic">
                One permanent URL, two beautiful phases of your dog&apos;s journey
              </p>
            </div>
          </div>

          {/* Exclusive Benefits Card */}
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-purple-500 text-surface rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
              Exclusive Benefits
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-500" />
                <p className="text-text-muted font-body text-sm">
                  Access to WCU dog shows
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <p className="text-text-muted font-body text-sm">
                  Member-only events
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-purple-500" />
                <p className="text-text-muted font-body text-sm">
                  Partner discounts
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-text-muted/80 italic">
                Special perks for WCU registered dogs
              </p>
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
              No annual fees—your dog is honored forever in our global registry of extraordinary companions.
            </p>
          </div>
        </div>

        {/* Bonus CTA */}
        <div className="text-center mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20">
          <p className="text-3xl font-semibold text-primary mb-2">
            Plus: <span className="text-accent">$5 from every registration</span> directly supports shelter animals!
          </p>
          <p className="text-text-muted">
            Your celebration helps feed, vaccinate, and care for rescue animals in need
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/register"
            className="bg-buttons text-surface px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            Register Your Dog
          </Link>
          <button className="border border-primary text-primary px-8 py-4 rounded-xl font-heading font-semibold hover:bg-primary hover:text-surface transition-all">
            Learn About Membership
          </button>
        </div>
        <p className="mt-6 font-body2 text-text-muted">
          Join thousands celebrating their unique companions worldwide
        </p>
      </div>
    </section>

  );
}
