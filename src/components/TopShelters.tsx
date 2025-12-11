// components/TopShelters.tsx
import { supabase } from "@/lib/supabase";

// Define the type for shelter data
interface Shelter {
  shelter_name: string;
  shelter_city: string;
  shelter_state: string;
  dog_count: number;
}

export default async function TopShelters() {
  const { data: topShelters } = (await supabase
    .from("shelter_stats")
    .select("*")
    .limit(6)) as { data: Shelter[] | null };
  if (!topShelters || topShelters.length === 0) {
    return (



      <section className="py-16 bg-background">
        <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border max-w-7xl mx-auto px-4 mb-16 ">
          <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">
            Top Rescue Organizations
          </h2>
          <p className="text-text-muted text-center py-8">
            No shelter data yet. Be the first to register your rescue dog!
          </p>
        </div>
      </section>
    );
  }

  return (

    <section className="py-16 bg-background">
      <div className="bg-surface rounded-2xl p-8 shadow-lg border border-border max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">
          Top Rescue Organizations
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topShelters.map((shelter: Shelter) => (
            <div
              key={`${shelter.shelter_name}-${shelter.shelter_city}-${shelter.shelter_state}`}
              className="bg-background rounded-xl p-4 border border-border"
            >
              <h3 className="font-heading font-semibold text-primary">
                {shelter.shelter_name}
              </h3>
              <p className="text-text-muted text-sm mt-1">
                {shelter.shelter_city}, {shelter.shelter_state}
              </p>
              <div className="mt-2 text-xs text-primary font-semibold">
                {shelter.dog_count} {shelter.dog_count === 1 ? "dog" : "dogs"}{" "}
                registered
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="/shelters"
            className="bg-buttons text-surface px-6 py-3 rounded-xl font-heading font-semibold hover:opacity-90 transition-all inline-block"
          >
            View All Shelters & Rescues
          </a>
        </div>
      </div>
    </section>
  );


}

