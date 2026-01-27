import Image from "next/image";
import { ChevronRight, MapPin } from "lucide-react";

export default function BuilderHero() {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div
        className="h-[480px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-travel.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 h-[480px] bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center text-sm text-white/80">
            <span>Home</span>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span>Trips</span>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="font-medium text-white">Itinerary Builder</span>
          </div>

          {/* Package Row */}
          <div className="flex items-start gap-4">
            
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              <Image
                src="/varkala.png"
                alt="Varkala"
                width={56}
                height={56}
                className="rounded-lg border border-white/20"
              />
              <Image
                src="/munnar.png"
                alt="Munnar"
                width={56}
                height={56}
                className="rounded-lg border border-white/20"
              />
              <Image
                src="/kumarakom.png"
                alt="Kumarakom"
                width={56}
                height={56}
                className="rounded-lg border border-white/20"
              />
            </div>

            {/* Text */}
            <div>
              {/* Animated curation text */}
              <div className="mb-1 flex items-center gap-2 text-sm text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                </span>
                Curate your itinerary...
              </div>

              <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-white">
                Varkala – Munnar – Kumarakom
              </h1>

              <div className="mt-2 flex items-center gap-3 text-sm text-white/90">
                <MapPin className="h-4 w-4" />
                7 Days · South Kerala · Custom Package
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
