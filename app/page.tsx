import HeroSection from "@/components/HeroSection";
import DogShowSection from "@/components/DogShowSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import DogShowcase from "@/components/DogShowcase";
import CommunityStats from "@/components/CommunityStats";
import ImpactDashboard from "@/components/ImpactDashboard";
import DetailsSection from "@/components/DetailsSection";


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValuePropsSection />
      <DetailsSection />
      <ImpactDashboard />
      <CommunityStats />



      {/* <DogShowSection /> */}

    </div>
  );
}
