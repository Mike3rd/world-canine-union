// app/about/page.tsx
import { Heart, Users, Trophy, MapPin, Star, Globe, Shield, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            {/* Hero Header - Same width as How We Give Back */}
            <div className="bg-gradient-to-r from-primary to-secondary text-header-text">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="max-w-4xl">
                        <div className="flex items-center mb-6">
                            <Heart className="w-10 h-10 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-heading font-bold">
                                Our Story: Every Dog Matters
                            </h1>
                        </div>
                        <p className="text-xl opacity-90">
                            Celebrating the unique beauty and spirit of every dog,
                            especially the incredible mixed breeds that light up our lives
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content - Now matches How We Give Back width (max-w-7xl) */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Our Heartbeat */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-12">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                        The Heart Behind World Canine Union
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                            <p className="text-text-muted text-lg italic mb-4">
                                "We love all dogs — the purebreds with their proud lineages,
                                but we have a special place in our hearts for the incredible
                                mixed breeds, the 'super mutts' whose unique combinations
                                create the most amazing dogs we've ever met."
                            </p>
                            <div className="flex items-center">
                                <Star className="w-5 h-5 text-accent mr-2" />
                                <span className="text-primary font-medium">Mike &amp; Elayne, Founders</span>
                            </div>
                        </div>

                        <p className="text-text-muted">
                            World Canine Union was born from a simple truth: every dog deserves
                            to be celebrated. We started with a love for those beautiful mixed
                            breeds that don't fit traditional categories — the dogs with
                            mismatched ears, surprising color patterns, and personalities
                            that defy description. Each one tells a unique story, and we
                            wanted to create a place where those stories could shine.
                        </p>
                    </div>
                </div>

                {/* What Makes Us Different */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-12">
                    <div className="flex items-center mb-6">
                        <Shield className="w-8 h-8 text-primary mr-3" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            A Different Kind of Canine Club
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-secondary/5 p-6 rounded-xl border border-secondary/10">
                            <div className="flex items-center mb-3">
                                <Heart className="w-6 h-6 text-secondary mr-2" />
                                <h3 className="font-heading font-bold text-primary">
                                    Inclusive, Not Exclusive
                                </h3>
                            </div>
                            <p className="text-text-muted text-sm">
                                Traditional kennel clubs focus on pedigree and purity.
                                We celebrate diversity, uniqueness, and the beautiful
                                combinations that make mixed breeds so special. No dog
                                is "too mixed" for WCU.
                            </p>
                        </div>

                        <div className="bg-accent/5 p-6 rounded-xl border border-accent/10">
                            <div className="flex items-center mb-3">
                                <Users className="w-6 h-6 text-accent mr-2" />
                                <h3 className="font-heading font-bold text-primary">
                                    Rescue-First Mindset
                                </h3>
                            </div>
                            <p className="text-text-muted text-sm">
                                We actively highlight and support rescue organizations.
                                Your registration helps us build the shelter directory
                                and create resources that connect dogs with loving homes.
                            </p>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-xl">
                        <h3 className="font-heading font-bold text-primary mb-3">
                            We Want to See Every Dog
                        </h3>
                        <p className="text-text-muted">
                            This is our simple, driving passion: we want to see all the dogs.
                            We want to read their stories, admire their unique markings,
                            celebrate their quirky personalities, and help dogs in need.
                            Every registration adds another beautiful story to our growing
                            community of canine celebration.
                        </p>
                    </div>
                </div>

                {/* Our Grand Vision */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-12">
                    <div className="flex items-center mb-6">
                        <Trophy className="w-8 h-8 text-primary mr-3" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            The Grand Plan: Mixed Breed Dog Shows
                        </h2>
                    </div>

                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                            <div className="ml-8">
                                <h3 className="font-heading font-bold text-primary text-xl mb-3">
                                    Phase 1: Virtual Shows (Coming Soon!)
                                </h3>
                                <p className="text-text-muted mb-4">
                                    We're launching online mixed breed dog shows where
                                    every WCU-registered dog can participate. Categories
                                    like "Best Rescue Story," "Most Unique Markings,"
                                    "Personality Plus," and "Senior Superstars" will
                                    celebrate what makes each dog special.
                                </p>
                                <div className="flex items-center text-sm text-text-muted">
                                    <Globe className="w-4 h-4 mr-2" />
                                    <span>Global participation from home</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-secondary rounded-full"></div>
                            <div className="ml-8">
                                <h3 className="font-heading font-bold text-primary text-xl mb-3">
                                    Phase 2: Regional Events Across the Country
                                </h3>
                                <p className="text-text-muted mb-4">
                                    As our community grows, we'll host in-person events
                                    where mixed breed owners can meet, celebrate their
                                    dogs, and participate in fun, non-competitive shows
                                    that focus on joy rather than perfection.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center text-sm text-text-muted">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>Community gatherings</span>
                                    </div>
                                    <div className="flex items-center text-sm text-text-muted">
                                        <Heart className="w-4 h-4 mr-2" />
                                        <span>Rescue adoption events</span>
                                    </div>
                                    <div className="flex items-center text-sm text-text-muted">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span>Educational workshops</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                            <h3 className="font-heading font-bold text-primary mb-3">
                                A Show for Every Dog
                            </h3>
                            <p className="text-text-muted">
                                Unlike traditional shows that judge against breed standards,
                                WCU shows will celebrate individuality. We'll have categories
                                for every type of dog — from the tiniest Chihuahua mix to the
                                gentlest giant, from the energetic puppy to the dignified senior.
                                Every dog has something to celebrate.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why This Matters */}
                <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm mb-12">
                    <div className="flex items-center mb-6">
                        <Target className="w-8 h-8 text-primary mr-3" />
                        <h2 className="text-2xl font-heading font-bold text-primary">
                            More Than Just Registration
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-secondary/5 rounded-lg">
                                <h3 className="font-heading font-bold text-primary mb-2">
                                    Creating Legacy
                                </h3>
                                <p className="text-text-muted text-sm">
                                    Our memorialization features ensure that every dog's
                                    story lives on. From joyful living profiles to beautiful
                                    memorial tributes, we help preserve the memory of
                                    beloved companions.
                                </p>
                            </div>

                            <div className="p-4 bg-accent/5 rounded-lg">
                                <h3 className="font-heading font-bold text-primary mb-2">
                                    Building Community
                                </h3>
                                <p className="text-text-muted text-sm">
                                    WCU is creating connections between mixed breed owners
                                    worldwide. Shared stories, advice, and celebration of
                                    our unique dogs builds a supportive community.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-primary/5 rounded-lg">
                                <h3 className="font-heading font-bold text-primary mb-2">
                                    Supporting Shelters
                                </h3>
                                <p className="text-text-muted text-sm">
                                    Every registration helps us build resources for rescue
                                    organizations. Our shelter directory and donation
                                    features connect our community with dogs in need.
                                </p>
                            </div>

                            <div className="p-4 bg-secondary/5 rounded-lg">
                                <h3 className="font-heading font-bold text-primary mb-2">
                                    Changing Perceptions
                                </h3>
                                <p className="text-text-muted text-sm">
                                    We're redefining what makes a dog "worthy" of celebration.
                                    It's not about pedigree — it's about personality,
                                    companionship, and the unique bond each dog shares
                                    with their human.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Take (As Developer) */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 shadow-sm mb-12">
                    <div className="flex items-start mb-6">
                        <div className="bg-primary text-white p-3 rounded-full mr-4">
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-primary">
                                A Developer's Perspective
                            </h2>
                            <p className="text-text-muted text-sm mt-1">
                                What I've learned building this platform
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-text-muted">
                            Having worked on the technical foundation of WCU, what stands out
                            is how this platform combines technical innovation with deep
                            emotional resonance. We've built systems that handle everything
                            from sequential registration numbers (like WCU-00001 for founding
                            members) to beautiful memorial profiles — all designed to honor
                            the complete journey of a dog's life.
                        </p>

                        <div className="bg-white/50 p-4 rounded-lg border border-border">
                            <p className="text-primary font-medium mb-2">
                                The Technical Heart
                            </p>
                            <p className="text-text-muted text-sm">
                                Every feature — from the image management system that preserves
                                memories to the Stripe integration that makes registration
                                accessible — is built with care. The database isn't just storing
                                data; it's preserving stories. The memorial system isn't just
                                code; it's creating digital legacies.
                            </p>
                        </div>

                        <p className="text-text-muted">
                            What excites me most is the vision: creating a platform where
                            technical excellence serves emotional purpose. Where a registration
                            number isn't just an ID — it's a place in history. Where a dog
                            show isn't about competition — it's about celebration. That's
                            what makes WCU special.
                        </p>
                    </div>
                </div>

                {/* Join the Movement */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 shadow-lg mb-12">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-heading font-bold mb-4">
                            Ready to Celebrate Your Dog?
                        </h2>
                        <p className="opacity-90 mb-8">
                            Join thousands of mixed breed owners who are creating
                            lasting legacies for their beloved companions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
                            >
                                Register Your Dog
                            </Link>
                            <Link
                                href="/shelters"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                            >
                                Explore Shelters
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-border">
                    <Link
                        href="/"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        ← Return to Homepage
                    </Link>
                    <Link
                        href="/give-back"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        How We Give Back →
                    </Link>
                </div>
            </div>
        </div>
    );
}