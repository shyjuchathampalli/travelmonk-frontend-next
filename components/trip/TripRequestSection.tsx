import TripRequestCard from "@/components/trip/TripRequestCard/TripRequestCard";

export default function TripRequestSection({
  floating = false,
}: {
  floating?: boolean;
}) {
  return (
    <section className="relative -mt-28 z-20">
      <div className="max-w-6xl mx-auto px-6">
        <TripRequestCard />
      </div>
    </section>
  );
}
