import Link from "next/link";

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
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column - Features */}
            <div className="flex-1 space-y-6 p-8 bg-surface-light rounded-2xl border border-border shadow-sm">
              <h3 className="text-2xl font-heading font-bold text-primary">
                Your <span className="text-accent">One-Time $XXX Fee</span> Includes:
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: "📜",
                    title: "Official Digital Certificate",
                    desc: "Beautifully designed certificate for your unique companion"
                  },
                  {
                    icon: "🌐",
                    title: "Forever Digital Legacy",
                    desc: "Personalized webpage with photos, story, and biography"
                  },
                  {
                    icon: "🌈",
                    title: "Rainbow Journey Tribute",
                    desc: "Transforms into a loving memorial when the time comes"
                  },
                  {
                    icon: "⚡",
                    title: "Lifetime Membership",
                    desc: "No annual fees—honored forever in our global registry"
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="text-2xl flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-heading font-semibold text-primary mb-1">
                        {item.title}
                      </h4>
                      <p className="font-body2 text-text-muted text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Animal Welfare */}
            <div className="flex-1 p-8 bg-gradient-to-bl from-background to-white rounded-2xl border border-border shadow-sm relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-background rounded-full blur-xl" />

              <div className="relative h-full flex flex-col">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="text-2xl">❤️</div>
                  <h3 className="text-2xl font-heading font-bold text-primary">
                    Supporting Canine Welfare
                  </h3>
                </div>

                <div className="space-y-4 flex-1">
                  <p className="font-body2 text-text-muted leading-relaxed">
                    <span className="font-semibold text-accent">A portion of every registration</span> directly supports dog rescue organizations and animal welfare initiatives worldwide.
                  </p>

                  <div className="bg-surface/50 p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body2 font-semibold text-primary">Your Registration Impact</span>
                      <span className="text-lg">🐾</span>
                    </div>
                    <ul className="space-y-2 font-body2 text-sm text-text-muted">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Medical care for rescued dogs
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Shelter and rehabilitation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Finding loving forever homes
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/50 mt-auto">
                    <p className="font-body2 italic text-primary">
                      "Celebrate your companion while helping dogs in need."
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
