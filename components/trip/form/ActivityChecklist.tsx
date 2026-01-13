"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const activities = [
  "Surfing and beginner surf lessons",
  "Ayurvedic massage and wellness therapy",
  "Meditation and yoga retreats",
  "Boat cruise and kayaking in nearby backwaters",
  "Visit to Sivagiri Mutt and spiritual centers",
];

export default function ActivityChecklist() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleActivity = (activity: string) => {
    setSelected((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div className="mt-6">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-600">
        Activities
      </h4>

      <div className="space-y-2">
        {activities.map((activity) => {
          const isActive = selected.includes(activity);

          return (
            <label
              key={activity}
              className={`
                flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5
                transition-all duration-150
                ${
                  isActive
                    ? "border-teal-700 bg-teal-50"
                    : "border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50/50"
                }
              `}
            >
              {/* Checkbox */}
              <div className="mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => toggleActivity(activity)}
                  className="
                    h-4 w-4 cursor-pointer
                    accent-teal-700
                  "
                />
              </div>

              {/* Text */}
              <span
                className={`text-sm leading-snug ${
                  isActive ? "text-teal-800" : "text-gray-700"
                }`}
              >
                {activity}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
