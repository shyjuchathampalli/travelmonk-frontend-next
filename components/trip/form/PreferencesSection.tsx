"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const stayOptions = ["Resort", "Boutique", "Luxury", "Budget"];
const transportOptions = ["Sedan", "SUV", "MUV / Van"];

function OptionGroup({
  title,
  options,
}: {
  title: string;
  options: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mt-6">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`
                group flex items-center gap-1.5
                rounded-lg border px-3 py-1.5 text-sm
                transition-all duration-150
                ${
                  isActive
                    ? "border-green-600 bg-green-50 text-green-700 shadow-sm"
                    : "border-gray-300 bg-white text-gray-700 hover:border-green-400 hover:bg-green-50/50"
                }
              `}
            >
              {/* Check icon only when selected */}
              {isActive && (
                <Check className="h-3.5 w-3.5 text-green-600" />
              )}
              <span className="whitespace-nowrap">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PreferencesSection() {
  return (
    <>
      <OptionGroup title="Stay Options" options={stayOptions} />
      <OptionGroup
        title="Preferable Transportation"
        options={transportOptions}
      />
    </>
  );
}
