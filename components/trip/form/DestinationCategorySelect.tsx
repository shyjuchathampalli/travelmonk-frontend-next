"use client";

import { useState } from "react";
import {
  Palmtree,
  Mountain,
  Landmark,
  Waves,
  Droplets,
  Check,
} from "lucide-react";

/**
 * Category definition with icons
 */
const categories = [
  { label: "Beaches", icon: Palmtree },
  { label: "Hill Station", icon: Mountain },
  { label: "Pilgrimage", icon: Landmark },
  { label: "Backwaters", icon: Waves },
  { label: "Waterfalls", icon: Droplets },
];

export default function DestinationCategorySelect() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
        Where would you like to go?
      </h3>

      <div className="flex flex-wrap gap-3">
        {categories.map(({ label, icon: Icon }) => {
          const isActive = selected.includes(label);

          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleCategory(label)}
              className={`
                group relative flex items-center gap-2
                cursor-pointer
                rounded-xl px-4 py-2.5 text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-teal-900 text-white shadow-md"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-teal-600 hover:bg-teal-50"
                }
              `}
            >
              {/* Icon */}
              <Icon
                className={`h-4 w-4 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-teal-700"
                }`}
              />

              {/* Label */}
              <span>{label}</span>

              {/* Check indicator (active only) */}
              {isActive && (
                <Check className="ml-1 h-4 w-4 text-white opacity-90" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
