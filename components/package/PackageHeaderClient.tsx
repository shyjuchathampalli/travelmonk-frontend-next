"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { getLucideIcon } from "@/lib/getLucideIcon";
import { useState } from "react";

type Props = {
  pkg: any;
};


export default function PackageHeaderClient({ pkg }: Props) {
  return (
    <section className="pb-10 border-b border-gray-200">

      {/* ================= TOP ROW ================= */}
      <div className="flex items-start justify-between mb-4">

        {/* Days */}
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <CalendarDays size={15} />
          <span>{pkg.number_of_days} Days</span>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-5">

          {/* Category Icons */}
          <div className="flex items-center gap-4">
            {pkg.categories?.map((cat: any) => {
              const Icon = getLucideIcon(cat.icon);

              return (
                <div key={cat.id} className="relative group">
                  <Icon
                    size={18}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  />

                  {/* Tooltip */}
                  <div className="
                    absolute top-full mt-2 left-1/2 -translate-x-1/2
                    whitespace-nowrap px-2 py-1
                    text-xs font-medium
                    bg-white text-gray-700
                    rounded-md shadow-md border border-gray-200
                    opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible
                    transition-all duration-150 z-50
                  ">
                    {cat.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Route Map Preview */}
          {pkg.images?.route_map && (
            <RouteMapPreview image={pkg.images.route_map} />
          )}
        </div>
      </div>

      {/* ================= TITLE ================= */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-3">
        {pkg.name}
      </h1>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-sm text-gray-500 leading-relaxed max-w-3xl mb-5">
        {pkg.description}
      </p>

      {/* ================= DESTINATION THUMBNAILS ================= */}
      {pkg.destinations?.length > 0 && (
        <div className="flex gap-3">
          {pkg.destinations.map((dest: any) =>
            dest.image ? (
              <img
                key={dest.id}
                src={dest.image}
                alt={dest.name}
                className="
                  w-16 h-16
                  rounded-xl
                  object-cover
                  border border-gray-100
                  transition-transform duration-200
                  hover:scale-105
                "
              />
            ) : null
          )}
        </div>
      )}

      {/* CTA BUTTONS */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-3">

          {/* Active Primary */}
          <button
            className="
              flex-1 min-w-[160px]
              bg-[#ebd01b]
              text-black
              py-3 px-6
              rounded-lg
              text-sm font-semibold
              hover:brightness-95
              transition
              shadow-sm
            "
          >
            Request a Quote
          </button>

          {/* Disabled */}
          <button
            disabled
            className="
              flex-1 min-w-[160px]
              py-3 px-6
              rounded-lg
              text-sm font-semibold
              bg-gray-100
              text-gray-400
              cursor-not-allowed
            "
          >
            Confirm Package
          </button>

          {/* Disabled */}
          <button
            disabled
            className="
              flex-1 min-w-[160px]
              py-3 px-6
              rounded-lg
              text-sm font-semibold
              bg-gray-100
              text-gray-400
              cursor-not-allowed
            "
          >
            Book this Trip
          </button>

        </div>
      </div>
    
    </section>
  );
}

/* ================= ROUTE MAP COMPONENT ================= */

function RouteMapPreview({ image }: { image: string }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <MapPin
        size={20}
        className="text-blue-600 cursor-pointer transition-transform duration-200 hover:scale-110"
      />

      {show && (
        <div className="
          absolute right-0 top-full mt-3
          w-80 bg-white rounded-lg
          shadow-lg border border-gray-200
          overflow-hidden z-50
        ">
          <img
            src={image}
            alt="Route Map"
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}