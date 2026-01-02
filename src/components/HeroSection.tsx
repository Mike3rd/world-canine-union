import Link from "next/link";
import { Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-surface to-primary/5 py-20 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-12">
          {/* Charter Member Badge */}
          <div className="mb-6">
            <span className="text-2xl font-heading text-primary bg-gradient-to-r from-accent to-secondary text-white py-3 px-6 rounded-full font-bold inline-block">
              🏆 Charter Registration Opens Early 2026
            </span>
            <p className="text-lg text-primary mt-3 font-medium">
              First 500 dogs receive Founding Member status & special pricing
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-1">
            Soul over Pedigree &#8212;
          </h1>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
            Global Registry for all other Dogs
          </h1>

          {/* Essential "About Page" Blurb */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/5 border-l-4 border-accent pl-6 pr-8 py-5 rounded-r-xl mb-8">
              <p className="text-xl text-primary italic leading-relaxed mb-2">
                "We love all dogs — but celebrate the incredible mixed breeds and 'super mutts'
                whose unique stories deserve to be told."
              </p>
              <div className="flex items-center justify-end">
                <Star className="w-5 h-5 text-accent mr-2" />
                <span className="text-primary font-medium">Mike &amp; Elayne, Founders</span>
              </div>
            </div>

            <div className="space-y-4 text-xl text-text-muted font-body2 leading-relaxed mb-10">
              <p>
                Join the <span className="font-medium text-primary">inclusive canine community</span> where
                <span className="font-medium text-primary"> every dog's story matters</span> — purebred, mixed,
                or somewhere wonderfully in between.
              </p>
              <p>
                <span className="font-medium text-primary">Charter Members</span> will secure the lowest
                registration numbers and Founding Member status for their dogs. These early numbers
                (WCU-00002 through WCU-00500) will become part of WCU history.
              </p>
            </div>
          </div>

          {/* Charter Member CTA */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-dashed border-primary/30 rounded-2xl p-6">
              <h3 className="font-heading font-bold text-primary text-xl mb-3">
                🎯 Be a Founding Member
              </h3>
              <p className="text-text-muted mb-4">
                Charter registration opens early 2026. The first 500 dogs registered will:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">🏅</div>
                  <p className="text-sm font-medium text-primary">Founding Status</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">💰</div>
                  <p className="text-sm font-medium text-primary">Charter Pricing</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">#002-500</div>
                  <p className="text-sm font-medium text-primary">Lowest Numbers</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/contact?interest=charter"
              className="bg-gradient-to-r from-primary to-secondary text-white font-heading font-bold py-4 px-10 rounded-xl text-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Charter Member Updates
            </Link>
            <Link
              href="/about"
              className="bg-white border-2 border-primary text-primary font-heading font-bold py-4 px-10 rounded-xl text-xl hover:bg-primary/5 transition-colors"
            >
              Discover Our Mission
            </Link>
          </div>

          {/* Countdown Note */}
          <p className="text-text-muted text-sm mt-6">
            Limited to 500 Founding Members • Charter pricing with discount codes • Early numbers permanently recorded
          </p>
        </div>
      </div>
    </section>
  );
}