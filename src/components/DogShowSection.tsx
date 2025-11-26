export default function DogShowSection() {
  return (
    <section className="py-16 bg-background">
      {/* Online Dog Show - Modern Card */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-surface rounded-2xl p-8 shadow-lg border border-border">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-surface">🏆</span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-2">
                Online Dog Show
              </h2>
              <p className="text-lg text-text-muted">
                Monthly competitions with cash prizes for registered members
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary">✓</span>
                </div>
                <p className="font-body2 text-text">Exclusive to WCU members</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary">💵</span>
                </div>
                <p className="font-body2 text-text">Cash prize competitions</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent">🌍</span>
                </div>
                <p className="font-body2 text-text">Global community events</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
