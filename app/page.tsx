import HeroSection from "@/components/HeroSection";
import DogShowSection from "@/components/DogShowSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import ImpactDashboard from "@/components/ImpactDashboard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ImpactDashboard />
      <ValuePropsSection />
      <DogShowSection />

    </div>
  );
}
