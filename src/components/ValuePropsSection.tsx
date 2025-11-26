export default function ValuePropsSection() {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">
          Why Join the World Canine Union?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
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
          <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
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
          <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-accent text-surface rounded-lg flex items-center justify-center mb-4">
              <span className="text-lg">⭐</span>
            </div>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-4">
              Exclusive Benefits
            </h3>
            <p className="text-text-muted font-body leading-relaxed">
              Access to online shows, member events, and partner discounts for
              registered dogs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
