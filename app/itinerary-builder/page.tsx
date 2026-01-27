import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import BuilderHero from "./components/BuilderHero";
import AdditionalActivitiesSelect from "./components/AdditionalActivitiesSelect";
import DayAccordion from "./components/DayAccordion";

export default function ItineraryBuilderPage() {
  return (
    <>
      <Header />

      <BuilderHero />

      {/* Floating Builder Container */}
      <main className="relative -mt-24 bg-gray-50 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            
            {/* Top-right control */}
            <div className="mb-6 flex justify-end">
              <AdditionalActivitiesSelect />
            </div>

            {/* Day-wise itinerary */}
            <DayAccordion />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}




