"use client";

import { useState } from "react";
import { Plus, Check, Sparkles } from "lucide-react";

const options = [
  "Candle Light Dinner",
  "Temple Visit",
  "Panchakarma Treatment",
  "Private Houseboat Dinner",
  "Sunrise Trek",
];

export default function AdditionalActivitiesSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          flex items-center gap-2 rounded-xl border border-gray-300
          bg-white px-4 py-2 text-sm font-medium text-gray-800
          shadow-sm transition
          hover:bg-gray-50
        "
      >
        <Sparkles className="h-4 w-4 text-teal-600" />
        Additional activities
        {selected.length > 0 && (
          <span className="ml-1 rounded-full bg-teal-600 px-2 py-0.5 text-xs font-semibold text-white">
            {selected.length}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="
            absolute right-0 z-20 mt-2 w-80
            rounded-2xl border border-gray-200
            bg-white p-4
            shadow-[0_10px_30px_rgba(0,0,0,0.12)]
            animate-[fadeIn_0.15s_ease-out]
          "
        >
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
            Add to your itinerary
          </h4>

          <div className="space-y-1">
            {options.map((opt) => {
              const active = selected.includes(opt);

              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggle(opt)}
                  className={`
                    flex w-full items-center justify-between
                    rounded-lg border px-3 py-2 text-sm
                    transition
                    ${
                      active
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-teal-50/50"
                    }
                  `}
                >
                  <span>{opt}</span>
                  {active && (
                    <Check className="h-4 w-4 text-teal-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <p className="mt-3 text-xs text-gray-500">
            You can assign these activities to specific days later.
          </p>
        </div>
      )}
    </div>
  );
}
