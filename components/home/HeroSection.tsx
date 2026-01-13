import TripRequestSection from "@/components/trip/TripRequestSection";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      
      {/* Background Image */}
      <div
        className="h-[520px] w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-travel.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 h-[520px] bg-gradient-to-r from-black/60 via-black/40 to-black/20" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <h1 className="max-w-xl text-4xl font-semibold text-white leading-tight">
            Plan unforgettable journeys,
            <br /> crafted just for you
          </h1>

          <p className="mt-4 max-w-lg text-white/90 text-lg">
            Build, customize and curate your perfect travel itinerary
          </p>
        </div>
      </div>

      {/* Floating Form */}
      <div className="relative -mt-40">
        <TripRequestSection floating />
      </div>
    </section>
  );
}
