import HeroSection from "@/components/HeroSection";
import DogShowSection from "@/components/DogShowSection";
import ValuePropsSection from "@/components/ValuePropsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DogShowSection />
      <ValuePropsSection />
    </div>
  );
}
