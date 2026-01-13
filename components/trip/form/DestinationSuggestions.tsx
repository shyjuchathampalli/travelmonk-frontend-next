"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const suggestions: Record<string, string[]> = {
  "Hill Station": ["Munnar", "Ponmudi", "Wayanad"],
  Beaches: ["Varkala", "Kovalam", "Marari"],
  Wildlife: ["Thekkady", "Silent Valley"],
};

export default function DestinationSuggestions() {
  const activeCategory = "Hill Station"; // later from state
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  const togglePlace = (place: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(place)
        ? prev.filter((p) => p !== place)
        : [...prev, place]
    );
  };

  return (
    <div className="mt-6">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
        Suggested {activeCategory}s
      </h4>

      <div className="flex flex-wrap gap-2">
        {suggestions[activeCategory].map((place) => {
          const isActive = selectedPlaces.includes(place);

          return (
            <button
              key={place}
              type="button"
              onClick={() => togglePlace(place)}
              className={`
                flex items-center gap-1.5
                cursor-pointer
                rounded-full border px-3 py-1.5 text-sm
                transition-all duration-150
                ${
                  isActive
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-gray-300 bg-white text-gray-600 hover:border-teal-400 hover:bg-teal-50/60"
                }
              `}
            >
              {isActive && (
                <Check className="h-3.5 w-3.5 text-teal-600" />
              )}
              {place}
            </button>
          );
        })}
      </div>
    </div>
  );
}
