"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import { apiFetch } from "@/lib/apiClient";
import { ChevronDown, Check } from "lucide-react";
import { useMemo } from "react";

type Props = {
  slug: string;          // ✅ REQUIRED
  dayPlans: any[];
};

export default function DayByDayAccordionClient({
  slug,
  dayPlans,
}: Props) {

  const [openDay, setOpenDay] = useState<number | null>(1);
  const [comments, setComments] = useState<Record<number, string>>({});

  const [selectedActivities, setSelectedActivities] =
    useState<Record<number, any[]>>({});

  const [suggestedActivities, setSuggestedActivities] =
    useState<Record<number, any[]>>({});

  const [loadingActivities, setLoadingActivities] =
    useState<Record<number, boolean>>({});

  const [itineraries, setItineraries] = useState<any[]>([]);
  const [tripId, setTripId] = useState<number | null>(null);

  const [mode, setMode] = useState<"package" | "trip">("package");

  const [savingNotes, setSavingNotes] =
  useState<Record<number, boolean>>({});

  const [notesSaved, setNotesSaved] =
  useState<Record<number, boolean>>({});

  /**
   * ---------------------------------------------------
   * SMART LOAD (detect package vs trip mode)
   * ---------------------------------------------------
   */
  useEffect(() => {
    const loadTrip = async () => {
      try {
        const res = await apiFetch(`/packages/${slug}/load`);
        const json = await res.json();

        setMode(json.mode);

        if (json.mode === "trip") {
          setTripId(json.data.id);
          setItineraries(json.data.itineraries || []);
        }
      } catch (e) {
        console.error("Failed loading trip:", e);
      }
    };

    loadTrip();
  }, [slug]);

  /**
   * ---------------------------------------------------
   * Decide data source dynamically
   * ---------------------------------------------------
   */

  const mergedDays = useMemo(() => {

  // package mode → unchanged
  if (mode !== "trip" || !itineraries.length) {
    return dayPlans;
  }

  // merge itinerary into package dayPlans
  return dayPlans.map((pkgDay: any) => {

    const itinerary = itineraries.find(
      (it: any) => it.day_number === pkgDay.day
    );

    return {
      ...pkgDay,      // ✅ keeps destination + image
      itinerary,      // ✅ attach trip data
    };
  });

}, [mode, itineraries, dayPlans]);


  const daysToRender = mergedDays;

  /**
   * ---------------------------------------------------
   * Initialize selected activities
   * (works for BOTH modes)
   * ---------------------------------------------------
   */
  useEffect(() => {
  const initial: Record<number, any[]> = {};

  daysToRender.forEach((day: any) => {

    const dayKey = day.day;

    const activities =
      day.itinerary?.activities?.map(
        (ia: any) => ia.activity
      ) ??
      day.activities ??
      [];

    initial[dayKey] = activities;
  });

  setSelectedActivities(initial);

}, [daysToRender]);


// Initialize comments (only in trip mode)
useEffect(() => {

  if (mode !== "trip") return;

  const initialComments: Record<number, string> = {};

  itineraries.forEach((it: any) => {
    initialComments[it.day_number] = it.notes || "";
  });

  setComments(initialComments);

}, [mode, itineraries]);

  /**
   * ---------------------------------------------------
   * Fetch suggested activities
   * ---------------------------------------------------
   */
  const fetchActivitiesByDestination = async (day: any) => {
    try {
      const dayKey = day.day || day.day_number;

      setLoadingActivities((prev) => ({
        ...prev,
        [dayKey]: true,
      }));

      const res = await fetch(
        `${API_BASE_URL}/activities?destination_id=${day.destination.id}`
      );

      const data = await res.json();
      const activities = data.data || data;

      const filtered = activities.filter(
        (act: any) =>
          !selectedActivities[dayKey]?.some((a) => a.id === act.id)
      );

      setSuggestedActivities((prev) => ({
        ...prev,
        [dayKey]: filtered,
      }));
    } finally {
      setLoadingActivities((prev) => ({
        ...prev,
        [day.day || day.day_number]: false,
      }));
    }
  };


  // Helper to get itinerary ID for a given day (only in trip mode)
      const getItineraryId = (day: any) => {
      if (mode !== "trip") return null;

      const itinerary = itineraries.find(
        (i) => i.day_number === day.day
      );

      return itinerary?.id;
    };
 
  // Sync selected activities with backend (only in trip mode)
  const syncActivities = async (day:any, activities:any[]) => {

  const itineraryId = getItineraryId(day);

  console.log("SYNC START", {
    itineraryId,
    activities,
  });

  if (!itineraryId) {
    console.warn("No itineraryId");
    return;
  }

  const res = await apiFetch(
    `/itineraries/${itineraryId}/activities/sync`,
    {
      method: "POST",
      body: JSON.stringify({
        activity_ids: activities.map(a => a.id),
      }),
    }
  );

  console.log("SYNC RESPONSE STATUS:", res.status);

  const text = await res.text();
  console.log("SYNC RESPONSE BODY:", text);
};

  // Save notes for itinerary (only in trip mode)
  const saveNotes = async (day:any) => {

  const itineraryId = getItineraryId(day);
  const dayKey = day.day;

  if (!itineraryId) return;

  // 🔵 show saving
  setSavingNotes(prev => ({
    ...prev,
    [dayKey]: true,
  }));

  setNotesSaved(prev => ({
    ...prev,
    [dayKey]: false,
  }));

  try {
    const res = await apiFetch(
      `/itineraries/${itineraryId}/notes`,
      {
        method: "PUT",
        body: JSON.stringify({
          notes: comments[dayKey],
        }),
      }
    );

    if (res.ok) {
      // ✅ show saved tick
      setNotesSaved(prev => ({
        ...prev,
        [dayKey]: true,
      }));

      // auto hide after 2 sec
      setTimeout(() => {
        setNotesSaved(prev => ({
          ...prev,
          [dayKey]: false,
        }));
      }, 2000);
    }

  } finally {
    setSavingNotes(prev => ({
      ...prev,
      [dayKey]: false,
    }));
  }
};




  /**
   * ---------------------------------------------------
   * UI (UNCHANGED)
   * ---------------------------------------------------
   */
  return (
    <div className="space-y-3 mt-2">
      {daysToRender.map((day: any) => {

        const dayKey = day.day || day.day_number;
        const isOpen = openDay === dayKey;

        return (
          <div
            key={dayKey}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white"
          >
            {/* HEADER */}
            <button
              onClick={() =>
                setOpenDay(isOpen ? null : dayKey)
              }
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">

                {day.destination?.image && (
                  <img
                    src={day.destination.image}
                    alt={day.destination.name}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                  />
                )}

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Day {dayKey}
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

                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                  {day.description}
                </p>

                <div className="space-y-2">

                  {/* SELECTED */}
                  {selectedActivities[dayKey]?.map((act: any) => (
                    <div
                      key={`selected-${act.id}`}
                      onClick={() => {

                        const updated =
                          (selectedActivities[dayKey] || [])
                            .filter(a => a.id !== act.id);

                        setSelectedActivities(prev => ({
                          ...prev,
                          [dayKey]: updated,
                        }));

                        setSuggestedActivities(prev => ({
                          ...prev,
                          [dayKey]: [...(prev[dayKey] || []), act],
                        }));

                        syncActivities(day, updated);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-teal-50 border border-teal-100 cursor-pointer hover:bg-teal-100 transition"
                    >
                      <Check size={14} className="text-teal-600" />
                      <span className="text-sm text-gray-700">
                        {act.name}
                      </span>
                    </div>
                  ))}

                  {/* SUGGESTED */}
                  {suggestedActivities[dayKey]?.map((act: any) => (
                    <div
                      key={`suggested-${act.id}`}
                      //Add activity on click
                      onClick={() => {

                      const updated = [
                        ...(selectedActivities[dayKey] || []),
                        act,
                      ];

                      setSelectedActivities(prev => ({
                        ...prev,
                        [dayKey]: updated,
                      }));

                      setSuggestedActivities(prev => ({
                        ...prev,
                        [dayKey]:
                          (prev[dayKey] || []).filter(a => a.id !== act.id),
                      }));

                      syncActivities(day, updated);
                    }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer transition"
                    >
                      <div className="h-4 w-4 rounded-sm border border-gray-300" />
                      <span className="text-sm text-gray-600">
                        {act.name}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => fetchActivitiesByDestination(day)}
                  className="text-xs font-medium text-teal-600 hover:text-teal-700 transition"
                >
                  {loadingActivities[dayKey]
                    ? "Loading..."
                    : "+ Add more activities"}
                </button>

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
                    value={comments[dayKey] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [dayKey]: e.target.value,
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
                    {(comments[dayKey] || "").length}/200
                  </div>

                  {/* Save Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => saveNotes(day)}
                      disabled={mode !== "trip" || savingNotes[dayKey]}
                      className="
                        text-xs
                        px-4 py-2
                        rounded-md
                        border border-gray-200
                        bg-[#f6e27a]
                        hover:bg-gray-50
                        text-gray-700
                        transition
                        disabled:opacity-50
                      "
                    >
                      {savingNotes[dayKey]
                        ? "Saving..."
                        : notesSaved[dayKey]
                        ? "Saved ✓"
                        : "Save Day Plan"}
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