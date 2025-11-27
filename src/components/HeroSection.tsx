import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-surface py-20 border-b border-border">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
          More Soul than Pedigree
        </h1>
        <p className="text-xl md:text-2xl text-text-muted font-body2 max-w-3xl mx-auto mb-8 leading-relaxed">
          The official global registry for celebrating one-of-a-kind dogs. Join
          our international community today!
        </p>
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
      </div>
    </section>
  );
}
