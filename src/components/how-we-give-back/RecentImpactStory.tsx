// components/how-we-give-back/RecentImpactStory.tsx
import { Calendar, Home, DollarSign, Heart, Dog, Shield, CheckCircle } from "lucide-react";

// This is the main component that you can easily update
export default function RecentImpactStory() {
    const impactStory = {
        date: "January 2024",
        organization: "Hope Haven Animal Rescue",
        description: "A no-kill shelter specializing in medical rehabilitation for abused and neglected animals in the Pacific Northwest.",
        location: "Based in Portland, OR • Founded 2015",
        donationAmount: "$5,240",
        registrationsCount: "1,048",
        fundUses: [
            {
                icon: Dog,
                title: "Medical Rehabilitation Ward",
                amount: "$2,620",
                description: "Funding a new recovery area for post-surgical animals, including heated beds, monitoring equipment, and specialized care supplies for 15 kennels."
            },
            {
                icon: Shield,
                title: "Vaccination Initiative",
                amount: "$1,572",
                description: "Providing core vaccines (DAPPv + Rabies) for approximately 60 incoming rescue animals, protecting them from preventable diseases as they prepare for adoption."
            },
            {
                icon: CheckCircle,
                title: "Spay/Neuter Clinic Support",
                amount: "$1,048",
                description: "Subsidizing spay/neuter surgeries for 20 animals from low-income families, helping prevent future unwanted litters while keeping pets in their loving homes."
            }
        ],
        quote: {
            text: "The support from World Canine Union has allowed us to expand our medical capacity dramatically. We can now treat more severe cases that we previously had to turn away.",
            author: "Dr. Sarah Chen, Medical Director, Hope Haven Animal Rescue"
        }
    };

    return (
        <div className="mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                    Recent Impact Story
                </h2>
                <p className="text-text-muted text-lg max-w-2xl mx-auto">
                    See how WCU registrations from our community are making a real difference
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-border overflow-hidden">
                <div className="md:flex">
                    {/* Left Side - Organization Info */}
                    <div className="md:w-2/5 bg-gradient-to-br from-secondary/10 to-primary/10 p-8 flex flex-col justify-center">
                        <div className="mb-6">
                            <div className="inline-flex items-center bg-primary text-header-text px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <Calendar className="w-4 h-4 mr-2" />
                                {impactStory.date}
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                                {impactStory.organization}
                            </h3>
                            <p className="text-text-muted mb-4">
                                {impactStory.description}
                            </p>
                            <div className="flex items-center text-sm text-text-muted">
                                <Home className="w-4 h-4 mr-2" />
                                <span>{impactStory.location}</span>
                            </div>
                        </div>
                        <div className="bg-surface/80 rounded-xl p-4 border border-border">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-primary">WCU Community Donation</span>
                                <DollarSign className="w-5 h-5 text-success" />
                            </div>
                            <div className="text-3xl font-bold text-primary">{impactStory.donationAmount}</div>
                            <p className="text-sm text-text-muted mt-2">
                                Generated from {impactStory.registrationsCount} WCU registrations
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Fund Usage Details */}
                    <div className="md:w-3/5 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                                <Heart className="w-6 h-6 text-header-text" />
                            </div>
                            <div>
                                <h4 className="font-heading font-bold text-primary text-lg">How the Funds Are Being Used</h4>
                                <p className="text-sm text-text-muted">Direct impact from your registrations</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {impactStory.fundUses.map((use, index) => (
                                <div key={index} className="flex">
                                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <use.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h5 className="font-heading font-bold text-primary mb-1">
                                            {use.title}
                                        </h5>
                                        <p className="text-text-muted">
                                            {use.amount} is {use.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quote Section */}
                        <div className="mt-8 pt-6 border-t border-border">
                            <blockquote className="italic text-text-muted text-lg border-l-4 border-primary pl-4 py-2">
                                "{impactStory.quote.text}"
                                <footer className="text-sm not-italic mt-2 font-medium text-primary">
                                    — {impactStory.quote.author}
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}