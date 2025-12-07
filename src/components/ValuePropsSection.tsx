import Link from "next/link";

export default function ValuePropsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">
          Why Join the World Canine Union?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-primary text-surface rounded-lg flex items-center justify-center mb-4">
              <span className="text-lg">🌐</span>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
              Global Certification
            </h3>
            <p className="text-text-muted font-body leading-relaxed">
              Official international recognition for your mixed breed's unique
              heritage and story.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-secondary text-surface rounded-lg flex items-center justify-center mb-4">
              <span className="text-lg">🤝</span>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
              Community Impact
            </h3>
            <p className="text-text-muted font-body leading-relaxed">
              Supporting rescue organizations and canine welfare initiatives
              worldwide.
            </p>
          </div>
          <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-accent text-surface rounded-lg flex items-center justify-center mb-4">
              <span className="text-lg">⭐</span>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
              Exclusive Benefits
            </h3>
            <p className="text-text-muted font-body leading-relaxed">
              Access to online dog shows, member events, and partner discounts for
              WCU registered dogs.
            </p>
          </div>
        </div>
        {/* ADD THIS: Bridge CTA */}
        <div className="text-center border-t border-border pt-12">
          <p className="text-xl font-body2 text-text-muted mb-6 max-w-2xl mx-auto">
            Ready to give your dog the recognition they deserve?
            <span className="font-semibold text-accent block mt-2">
              Choose how you'd like to proceed:
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA - Direct to Registration */}
            <Link
              href="/register"
              className="bg-buttons text-surface px-8 py-4 rounded-xl font-heading font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl min-w-[200px] text-center"
            >
              Register Now
            </Link>

            {/* Secondary CTA - Learn More First */}
            <Link
              href="/membership"
              className="border border-primary text-primary px-8 py-4 rounded-xl font-heading font-semibold hover:bg-primary hover:text-surface transition-all min-w-[200px] text-center"
            >
              Learn About Membership
            </Link>
          </div>

          <p className="mt-6 text-sm font-body text-text-muted">
            Or explore our <Link href="/faq" className="text-accent hover:underline">FAQ</Link> for common questions
          </p>
        </div>
      </div>
    </section>

  );
}
