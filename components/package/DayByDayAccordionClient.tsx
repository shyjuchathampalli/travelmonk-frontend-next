"use client";

import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import { ChevronDown, Check, MessageSquare } from "lucide-react";


type Props = {
  dayPlans: any[];
};

export default function DayByDayAccordionClient({ dayPlans }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [comments, setComments] = useState<Record<number, string>>({});

  const [selectedActivities, setSelectedActivities] = useState<Record<number, any[]>>({});
  const [suggestedActivities, setSuggestedActivities] = useState<Record<number, any[]>>({});
  const [loadingActivities, setLoadingActivities] = useState<Record<number, boolean>>({});

  useEffect(() => {
  const initial: Record<number, any[]> = {};

  dayPlans.forEach((day) => {
    initial[day.day] = day.activities || [];
  });

  setSelectedActivities(initial);
}, [dayPlans]);

const fetchActivitiesByDestination = async (day: any) => {
  try {
    setLoadingActivities((prev) => ({ ...prev, [day.day]: true }));

    const res = await fetch(
      `${API_BASE_URL}/activities?destination_id=${day.destination.id}`
    );

    const data = await res.json();

    const activities = data.data || data;

    // Remove already selected activities
    const filtered = activities.filter(
      (act: any) =>
        !selectedActivities[day.day]?.some((a) => a.id === act.id)
    );

    setSuggestedActivities((prev) => ({
      ...prev,
      [day.day]: filtered,
    }));
  } catch (error) {
    console.error("Failed to fetch activities:", error);
  } finally {
    setLoadingActivities((prev) => ({ ...prev, [day.day]: false }));
  }
};

console.log(dayPlans);

  return (
    <div className="space-y-3 mt-2">
      {dayPlans.map((day) => {
        const isOpen = openDay === day.day;

        return (
          <div
            key={day.day}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white"
          >
            {/* HEADER */}
            <button
            onClick={() => setOpenDay(isOpen ? null : day.day)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
            >
            <div className="flex items-center gap-4">

                {/* Destination Thumbnail */}
                {day.destination?.image && (
                <img
                    src={day.destination.image}
                    alt={day.destination.name}
                    className="
                    w-12 h-12
                    rounded-lg
                    object-cover
                    border border-gray-100
                    "
                />
                )}

                {/* Day Info */}
                <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Day {day.day}
                </p>
                <h3 className="font-semibold text-gray-900">
                    {day.destination?.name}
                </h3>
                </div>
            </div>

            <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
                }`}
            />
            </button>

            {/* BODY */}
            {isOpen && (
            <div className="px-6 pb-6 pt-5 space-y-6 border-t border-gray-100">

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                {day.description}
                </p>

                {/* Activities */}
                <div className="space-y-2">

                {/* Selected Activities */}
                {selectedActivities[day.day]?.map((act: any) => (
                <div
                    key={`selected-${act.id}`}
                    onClick={() => {
                    // Remove from selected
                    setSelectedActivities((prev) => ({
                        ...prev,
                        [day.day]: prev[day.day].filter((a) => a.id !== act.id),
                    }));

                    // Add back to suggested
                    setSuggestedActivities((prev) => ({
                        ...prev,
                        [day.day]: [...(prev[day.day] || []), act],
                    }));
                    }}
                    className="
                    flex items-center gap-3
                    px-4 py-2.5
                    rounded-lg
                    bg-teal-50
                    border border-teal-100
                    cursor-pointer
                    hover:bg-teal-100
                    transition
                    "
                >
                    <Check size={14} className="text-teal-600" />
                    <span className="text-sm text-gray-700">{act.name}</span>
                </div>
                ))}

                {/* Suggested Activities */}
                {suggestedActivities[day.day]?.map((act: any) => (
                    <div
                    key={`suggested-${act.id}`}
                    onClick={() => {
                        setSelectedActivities((prev) => ({
                        ...prev,
                        [day.day]: [...(prev[day.day] || []), act],
                        }));

                        setSuggestedActivities((prev) => ({
                        ...prev,
                        [day.day]: prev[day.day].filter((a) => a.id !== act.id),
                        }));
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer transition"
                    >
                    <div className="h-4 w-4 rounded-sm border border-gray-300" />
                    <span className="text-sm text-gray-600">{act.name}</span>
                    </div>
                ))}

                </div>

                {/* Add more activities */}
                <button
                type="button"
                onClick={() => fetchActivitiesByDestination(day)}
                className="text-xs font-medium text-teal-600 hover:text-teal-700 transition"
                >
                {loadingActivities[day.day] ? "Loading..." : "+ Add more activities"}
                </button>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-4">

                {/* Header Row */}
                <div className="flex items-center justify-between">

                    <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Day Notes
                    </div>

                    <button className="p-1 rounded-md hover:bg-gray-100 transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12h.01M12 12h.01M18 12h.01"
                        />
                    </svg>
                    </button>
                </div>

                {/* Comment Box */}
                <textarea
                    value={comments[day.day] || ""}
                    onChange={(e) =>
                    setComments({
                        ...comments,
                        [day.day]: e.target.value,
                    })
                    }
                    placeholder="Optional notes for this day..."
                    className="
                    mt-3
                    w-full
                    border border-gray-200
                    rounded-md
                    px-3 py-2
                    text-sm
                    focus:ring-1 focus:ring-teal-500
                    focus:border-teal-500
                    outline-none
                    transition
                    resize-none
                    bg-white
                    "
                    rows={2}
                    maxLength={200}
                />

                <div className="text-xs text-gray-400 text-right mt-1">
                    {(comments[day.day] || "").length}/200
                </div>
                {/* Update Button */}
                <div className="pt-2 flex justify-end">
                <button
                    className="
                    text-xs
                    px-4 py-2
                    rounded-md
                    border border-gray-200
                    bg-[#f6e27a]
                    hover:bg-gray-50
                    text-gray-700
                    transition
                    "
                >
                    Save Day Plan
                </button>
                </div>
                </div>
            </div>
            )}
          </div>
        );
      })}
    </div>
  );
}