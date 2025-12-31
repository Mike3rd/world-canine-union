// components/how-we-give-back/FutureInitiatives.tsx
import { Dog, Home, Users } from "lucide-react";

export default function FutureInitiatives() {
    const initiatives = [
        {
            icon: Dog,
            title: "Emergency Medical Fund",
            description: "Creating a dedicated fund for life-saving emergency surgeries for animals with no other funding options."
        },
        {
            icon: Home,
            title: "Transport Network",
            description: "Funding transport for animals from overcrowded shelters to areas with higher adoption rates."
        },
        {
            icon: Users,
            title: "Community Clinics",
            description: "Supporting low-cost vaccination and microchip clinics in underserved communities."
        }
    ];

    return (
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10 mb-12">
            <h3 className="text-2xl font-heading font-bold text-primary text-center mb-8">
                Upcoming Initiatives for 2024
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
                {initiatives.map((initiative, index) => (
                    <div key={index} className="bg-surface p-6 rounded-xl border border-border">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <initiative.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-heading font-bold text-primary mb-3">{initiative.title}</h4>
                        <p className="text-text-muted text-sm">{initiative.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}