"use client";

import Image from "next/image";
import { Plus, MapPin } from "lucide-react";
import { useState } from "react";

const destinations = [
  { name: "Munnar", image: "/munnar.png" },
  { name: "Varkala", image: "/varkala.png" },
  { name: "Kumarakom", image: "/kumarakom.png" },
];

const extraActivities = [
  "Candle Light Dinner",
  "Ayurvedic Wellness Session",
  "Private Houseboat Cruise",
  "Sunrise View Point Visit",
];

export default function DayActivities() {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (item: string) => {
    setSelectedExtras((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
        <MapPin className="h-4 w-4" />
        Destinations & Activities
      </h4>

      {/* Destinations */}
      <div className="grid gap-4 md:grid-cols-3">
        {destinations.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5"
          >
            <Image
              src={d.image}
              alt={d.name}
              width={44}
              height={44}
              className="rounded-md"
            />
            <span className="text-sm font-medium text-gray-800">
              {d.name}
            </span>
          </div>
        ))}
      </div>

      {/* Add More Activities */}
      <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
          <Plus className="h-4 w-4 text-teal-600" />
          Add more activities for this day
        </div>

        <div className="flex flex-wrap gap-2">
          {extraActivities.map((act) => {
            const active = selectedExtras.includes(act);

            return (
              <button
                key={act}
                onClick={() => toggleExtra(act)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition
                  ${
                    active
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-teal-50/50"
                  }`}
              >
                {act}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
