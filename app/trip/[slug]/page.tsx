import { notFound } from "next/navigation";
import { TRIP_LOCATIONS } from "@/lib/tripLocations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TripHero from "@/components/trip/TripHero";
import TripRequestSection from "@/components/trip/TripRequestSection";

/* ✅ REQUIRED for output: "export" */
export function generateStaticParams() {
  return Object.keys(TRIP_LOCATIONS).map((slug) => ({
    slug,
  }));
}

export default function TripPage({
  params,
}: {
  params: { slug: string };
}) {
  
  //  const location = TRIP_LOCATIONS[params.slug];
  const location = TRIP_LOCATIONS["kerala"];


  if (!location) notFound();

  return (
    <>
      <Header />
      <TripHero location={location} />
      <TripRequestSection location={location} />
      <Footer />
    </>
  );
}
