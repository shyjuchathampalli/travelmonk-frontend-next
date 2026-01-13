"use client";

import { Minus, Plus, Users, Baby } from "lucide-react";
import { useState } from "react";

function InlineCounter({
  label,
  icon: Icon,
  value,
  min,
  onChange,
}: {
  label: string;
  icon: React.ElementType;
  value: number;
  min: number;
  onChange: (value: number) => void;
}) {
  const canDecrease = value > min;

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm">
      
      {/* Left: Icon + Label */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="h-4 w-4 text-gray-400" />
        <span>{label}</span>
      </div>

      {/* Right: Counter */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => canDecrease && onChange(value - 1)}
          disabled={!canDecrease}
          className={`
            flex h-8 w-8 items-center justify-center rounded-full
            transition
            ${
              canDecrease
                ? "cursor-pointer bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
                : "cursor-not-allowed bg-gray-50 text-gray-300"
            }
          `}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <span className="w-6 text-center text-sm font-semibold text-gray-900">
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full
                     bg-gray-100 text-gray-700 transition
                     hover:bg-teal-100 hover:text-teal-700"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function TravellerCount() {
  const [adults, setAdults] = useState(2); // min 1
  const [children, setChildren] = useState(0); // min 0

  return (
    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
      <InlineCounter
        label="Adults"
        icon={Users}
        value={adults}
        min={1}
        onChange={setAdults}
      />

      <InlineCounter
        label="Children"
        icon={Baby}
        value={children}
        min={0}
        onChange={setChildren}
      />
    </div>
  );
}
