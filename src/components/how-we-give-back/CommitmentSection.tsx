// components/how-we-give-back/CommitmentSection.tsx
import { Shield, Dog, Heart, Home, CheckCircle } from "lucide-react";

export default function CommitmentSection() {
    return (
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                    Our Commitment to Rescue Animals
                </h2>
                <p className="text-text-muted mb-4">
                    At World Canine Union, we believe that celebrating our own dogs should also
                    help dogs in need. That's why we've built giving back into the very foundation
                    of our platform.
                </p>
                <p className="text-text-muted mb-6">
                    For every registration, 20% of the fee goes directly to supporting
                    animal rescue organizations. These funds are carefully distributed to
                    programs that make the biggest impact: shelter care, medical treatment,
                    and population control.
                </p>
                <div className="bg-primary/5 p-6 rounded-xl border border-border">
                    <h3 className="font-heading font-bold text-primary mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Verified Partnerships
                    </h3>
                    <p className="text-sm text-text-muted">
                        We vet every organization we work with to ensure they maintain
                        high standards of animal care, financial transparency, and
                        ethical practices.
                    </p>
                </div>
            </div>
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-border">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
                        <Dog className="w-10 h-10 text-primary mb-4" />
                        <h4 className="font-heading font-bold text-primary mb-2">Shelter Support</h4>
                        <p className="text-sm text-text-muted">Daily care & feeding programs</p>
                    </div>
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-xl border border-secondary/20">
                        <Heart className="w-10 h-10 text-secondary mb-4" />
                        <h4 className="font-heading font-bold text-primary mb-2">Medical Care</h4>
                        <p className="text-sm text-text-muted">Emergency & routine treatments</p>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-xl border border-accent/20">
                        <Home className="w-10 h-10 text-accent mb-4" />
                        <h4 className="font-heading font-bold text-primary mb-2">Spay/Neuter</h4>
                        <p className="text-sm text-text-muted">Population control initiatives</p>
                    </div>
                    <div className="bg-gradient-to-br from-success/10 to-success/5 p-6 rounded-xl border border-success/20">
                        <CheckCircle className="w-10 h-10 text-success mb-4" />
                        <h4 className="font-heading font-bold text-primary mb-2">Adoption Support</h4>
                        <p className="text-sm text-text-muted">Finding forever homes</p>
                    </div>
                </div>
            </div>
        </div>
    );
}