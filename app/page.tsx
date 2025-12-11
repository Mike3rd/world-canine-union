import HeroSection from "@/components/HeroSection";
import DogShowSection from "@/components/DogShowSection";
import ValuePropsSection from "@/components/ValuePropsSection";
import ImpactDashboard from "@/components/ImpactDashboard";
import TopShelters from "@/components/TopShelters";
import DetailsSection from "@/components/DetailsSection";


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValuePropsSection />
      <DetailsSection />
      <ImpactDashboard />
      {/* <DogShowSection /> */}
      <TopShelters />

    </div>
  );
}
