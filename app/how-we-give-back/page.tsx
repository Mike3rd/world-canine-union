// app/how-we-give-back/page.tsx
import HeroSection from '@/components/how-we-give-back/HeroSection';
import CommitmentSection from '@/components/how-we-give-back/CommitmentSection';
import RecentImpactStory from '@/components/how-we-give-back/RecentImpactStory';
import FutureInitiatives from '@/components/how-we-give-back/FutureInitiatives';
import CTASection from '@/components/how-we-give-back/CTASection';

export default function HowWeGiveBackPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 py-16">
                <CommitmentSection />
                <RecentImpactStory />
                <FutureInitiatives />
                <CTASection />
            </div>
        </div>
    );
}