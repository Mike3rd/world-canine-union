// components/how-we-give-back/HeroSection.tsx
import { Heart, Users, Calendar } from "lucide-react";

export default function HeroSection() {
    return (
        <div className="bg-gradient-to-r from-primary to-secondary text-header-text">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-heading font-bold mb-6">
                        How We Give Back
                    </h1>
                    <p className="text-xl opacity-90 mb-8">
                        Every WCU registration creates a ripple effect of positive change.
                        We're proud to share how our community directly supports animal rescue efforts.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                            <Heart className="w-5 h-5 mr-2" />
                            <span>20% of registration fees donated</span>
                        </div>
                        <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                            <Users className="w-5 h-5 mr-2" />
                            <span>Supporting verified rescue partners</span>
                        </div>
                        <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span>Quarterly impact reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}