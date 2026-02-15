import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TripHero from "@/components/trip/TripHero";
import TripRequestSection from "@/components/trip/TripRequestSection";
import LatestPackagesSection from "@/components/trip/LatestPackagesSection";

import { fetchStateBySlug } from "@/services/states";

export const dynamic = "force-dynamic";

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("TRIP SLUG:", slug);

  let state;
  try {
    state = await fetchStateBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Header />
      <TripHero state={state} />
      <TripRequestSection state={state} />
      <LatestPackagesSection state={state} />
      <Footer />
    </>
  );
}
