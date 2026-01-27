"use client";

import { useRouter } from "next/navigation";
import { Pencil, MapPin, Calendar } from "lucide-react";

interface SavedTripCardProps {
  id: string;
  title: string;
  region: string;
  duration: string;
  images: string[];
}

export default function SavedTripCard({
  id,
  title,
  region,
  duration,
  images,
}: SavedTripCardProps) {
  const router = useRouter();

  return (
    <div className="relative rounded-3xl bg-white p-6 shadow-xl">
      {/* Destination Images */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Destination"
            className="h-40 w-64 rounded-2xl object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Trip Info */}
      <div className="mt-4 space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {region}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {duration}
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => router.push(`/itinerary-builder/${id}`)}
        className="absolute bottom-6 right-6 inline-flex items-center gap-2
                   rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium
                   text-white shadow-lg hover:bg-emerald-700 transition"
      >
        <Pencil className="h-4 w-4" />
        Edit Itinerary
      </button>
    </div>
  );
}
