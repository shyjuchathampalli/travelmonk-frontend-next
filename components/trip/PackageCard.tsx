"use client";

import { MapPin, CalendarDays } from "lucide-react";
import { getLucideIcon } from "@/lib/getLucideIcon";
import { useState } from "react";

type PackageCardProps = {
  pkg: any;
};

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 p-6 overflow-visible">

      {/* ================= TOP HEADER ================= */}
      <div className="flex items-start justify-between mb-4">

        {/* Days */}
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <CalendarDays size={15} />
          <span>{pkg.number_of_days} Days</span>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-4">

          {/* Category Icons */}
          <div className="flex items-center gap-3">
            {pkg.categories?.map((cat: any) => {
              const Icon = getLucideIcon(cat.icon);

              return (
                <div key={cat.id} className="relative group">
                  <Icon
                    size={18}
                    className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                  />

                  {/* Tooltip */}
                  <div className="
                    absolute top-full mt-2 left-1/2 -translate-x-1/2
                    whitespace-nowrap
                    px-2 py-1
                    text-xs font-medium
                    bg-white text-gray-700
                    rounded-md shadow-lg border border-gray-200
                    opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible
                    transition-all duration-150
                    z-50
                  ">
                    {cat.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Route Map Preview */}
          {pkg.route_map_image && (
            <RouteMapPreview image={pkg.route_map_image} />
          )}
        </div>
      </div>

      {/* ================= TITLE ================= */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
        {pkg.name}
      </h3>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
        {pkg.description}
      </p>

      {/* ================= DESTINATION THUMBNAILS ================= */}
      {pkg.destinations?.length > 0 && (
        <div className="flex gap-3 mb-5">
          {pkg.destinations.slice(0, 4).map((dest: any) =>
            dest.image ? (
              <img
                key={dest.id}
                src={dest.image}
                alt={dest.name}
                className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-100"
              />
            ) : null
          )}
        </div>
      )}

      {/* ================= DAY PREVIEW ================= */}
      {pkg.day_plans?.length > 0 && (
        <div className="border-t border-gray-100 pt-4 text-sm text-gray-600 space-y-3">
          {pkg.day_plans.slice(0, 2).map((day: any, index: number) => (
            <div key={index}>
              <span className="text-gray-400 font-medium">
                Day {day.day_number}:
              </span>{" "}
              {day.activities?.map((a: any) => a.name).join(", ")}
            </div>
          ))}
        </div>
      )}

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-4 mt-7">
        <button className="flex items-center gap-2 border border-blue-200 text-blue-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-50 transition">
          <CalendarDays size={16} />
          View Day-by-Day Plan
        </button>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-sm">
          Build Itinerary
        </button>
      </div>
    </div>
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
          w-80
          bg-white
          rounded-xl
          shadow-2xl
          border border-gray-200
          overflow-hidden
          z-50
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
