"use client";

import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";

type Props = {
  dayPlans: any[];
};

export default function DayByDayAccordion({ dayPlans }: Props) {
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [comments, setComments] = useState<Record<number, string>>({});

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
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Day {day.day}
                </p>
                <h3 className="font-semibold text-gray-900">
                  {day.destination?.name}
                </h3>
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
              <div className="px-5 pb-6 pt-4 space-y-5 border-t border-gray-100">

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {day.description}
                </p>

                {/* Activities */}
                <div className="flex flex-wrap gap-2">
                  {day.activities?.map((act: any) => (
                    <span
                      key={act.id}
                      className="text-xs px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200"
                    >
                      {act.name}
                    </span>
                  ))}
                </div>

                {/* Comment Box */}
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MessageSquare size={16} />
                    <span>Add remarks for this day</span>
                  </div>

                  <textarea
                    value={comments[day.day] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [day.day]: e.target.value,
                      })
                    }
                    placeholder="Example: Replace trekking with light sightseeing..."
                    className="
                      w-full
                      border border-gray-300
                      rounded-lg
                      px-4 py-3
                      text-sm
                      focus:ring-2 focus:ring-[#ebd01b]
                      focus:border-[#ebd01b]
                      outline-none
                      transition
                      resize-none
                      bg-gray-50
                    "
                    rows={3}
                    maxLength={300}
                  />

                  <div className="text-xs text-gray-400 text-right mt-1">
                    {(comments[day.day] || "").length}/300
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