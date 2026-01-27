"use client";

import { useState } from "react";
import { Check, Hotel, Car } from "lucide-react";

const stayOptions = ["Resort", "Boutique", "Luxury", "Budget"];
const transportOptions = ["Sedan", "SUV", "MUV / Van"];

function OptionGroup({
  title,
  icon: Icon,
  options,
}: {
  title: string;
  icon: any;
  options: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
        <Icon className="h-4 w-4" />
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected === option;

          return (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`group flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm
                transition-all duration-150
                ${
                  isActive
                    ? "border-teal-600 bg-teal-50 text-teal-700 shadow-sm"
                    : "border-gray-300 bg-white text-gray-700 hover:border-teal-400 hover:bg-teal-50/50"
                }`}
            >
              {isActive && <Check className="h-3.5 w-3.5 text-teal-600" />}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DayPreferences() {
  return (
    <div className="space-y-5">
      <OptionGroup
        title="Stay Preference"
        icon={Hotel}
        options={stayOptions}
      />
      <OptionGroup
        title="Vehicle Preference"
        icon={Car}
        options={transportOptions}
      />
    </div>
  );
}
