import Link from "next/link";
import { FileText, Globe, Rainbow, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-surface py-20 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
            More Soul than Pedigree
          </h1>
          <p className="text-xl md:text-2xl text-text-muted font-body2 max-w-3xl mx-auto mb-8 leading-relaxed">
            The official global registry celebrating one-of-a-kind dogs. Join our community today!
          </p>
        </div>

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

            {/* Digital Legacy Card */}
            <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-secondary text-surface rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
                Forever Digital Legacy
              </h3>
              <p className="text-text-muted font-body text-sm">
                Personalized webpage with photos, story, and biography—a permanent tribute to your dog&apos;s life.
              </p>
            </div>

            {/* Rainbow Tribute Card */}
            <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-accent text-surface rounded-lg flex items-center justify-center mb-4">
                <Rainbow className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
                Rainbow Journey Tribute
              </h3>
              <p className="text-text-muted font-body text-sm">
                Transforms into a loving memorial when the time comes, preserving your dog&apos;s memory forever.
              </p>
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
            <p className="text-xl font-semibold text-primary mb-2">
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
      </div>
    </section>
  );
}
