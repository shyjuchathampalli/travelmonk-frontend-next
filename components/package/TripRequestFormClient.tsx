"use client";

import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import { apiFetch } from "@/lib/apiClient";
import {
  CalendarDays,
  Users,
  Baby,
  BedDouble,
  Car,
  Plane,
  Compass,
} from "lucide-react";

const stayOptions = ["Resort", "Boutique", "Luxury", "Budget"];
const transportOptions = ["Sedan", "SUV", "MUV / Van"];

export default function TripRequestFormClient({
  slug,
  packageId,
  packageDays,
}: {
  slug: string;
  packageId: number;
  packageDays: number;
}) {

  const [purpose, setPurpose] = useState<number | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [stay, setStay] = useState("");
  const [transport, setTransport] = useState("");
  const [childrenAges, setChildrenAges] = useState<number[]>([]);

  const [travelPurposes, setTravelPurposes] = useState<any[]>([]);
  const [loadingPurposes, setLoadingPurposes] = useState(true);

  const [mode, setMode] = useState<"package" | "trip">("package");
  const [tripData, setTripData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [arrivalQuery, setArrivalQuery] = useState("");
  const [arrivalSuggestions, setArrivalSuggestions] = useState<any[]>([]);
  const [arrivalPoint, setArrivalPoint] = useState<any>(null);
  const [loadingArrival, setLoadingArrival] = useState(false);

  const [isSelecting, setIsSelecting] = useState(false);

  const [tripId, setTripId] = useState<number | null>(null);

  const [hydrated, setHydrated] = useState(false);

  // Utility functions
  const formatDate = (date: Date) => {
    return new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
  };

  const addDays = (dateStr: string, days: number) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return formatDate(date);
  };

  const calculateDays = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const today = new Date();
  today.setDate(today.getDate() + 7);
  const minStartDate = formatDate(today);

  const normalizeDate = (date?: string | null) => {
      if (!date) return "";
      return date.split("T")[0]; // convert ISO → YYYY-MM-DD
    };  

  // Fetch travel purposes on mount
  useEffect(() => {
    const fetchTravelPurposes = async () => {
        try {
        const res = await apiFetch(`/travel-purposes`);
        const data = await res.json();

        // Adjust based on your API structure
        setTravelPurposes(data.data || data);
        } catch (error) {
        console.error("Failed to fetch travel purposes:", error);
        } finally {
        setLoadingPurposes(false);
        }
    };

    fetchTravelPurposes();
    }, []);

  const handleKidsChange = (value: number) => {
  setKids(value);

  setChildrenAges((prev) => {
    if (value > prev.length) {
      // add default ages
      return [
        ...prev,
        ...Array(value - prev.length).fill(5),
      ];
    }

    // remove extra ages
    return prev.slice(0, value);
  });
};

  // Load existing trip data if available
useEffect(() => {
  if (!slug) return;

  const loadSmartData = async () => {
    try {
      // Reset state before loading
      setMode("package");
      setTripData(null);
      setTripId(null);
      setHydrated(false);

      const res = await apiFetch(`/packages/${slug}/load`);
      const json = await res.json();

      if (json.mode === "trip") {
        const data = json.data;

        setMode("trip");
        setTripData(data);
        setTripId(data.id);

        setStartDate(normalizeDate(data.arrival_date));
        setEndDate(normalizeDate(data.end_date));

        setAdults(data.adults || 2);
        setKids(data.children || 0);
        setStay(data.stay_option || "");
        setTransport(data.transport_option || "");

        if (data.arrival_point) {
          setArrivalPoint(data.arrival_point);
          setArrivalQuery(data.arrival_point.name);
        }

        if (data.children_details) {
          setChildrenAges(
            data.children_details.map((c: any) => c.age)
          );
        }

        if (data.travel_purposes?.length) {
          setPurpose(data.travel_purposes[0].id);
        }
      }

      // Mark hydration finished
      setHydrated(true);

    } catch (error) {
      console.error("Failed to load package/trip:", error);
      setHydrated(true);
    }
  };

  loadSmartData();

}, [slug]);

useEffect(() => {
  console.log("🔁 MODE CHANGED:", mode);
}, [mode]);

useEffect(() => {
  console.log("💧 HYDRATED:", hydrated);
}, [hydrated]);


    useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return; // 🚫 skip fetch after selection
    }

    if (arrivalQuery.length < 2) {
      setArrivalSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoadingArrival(true);

        const res = await apiFetch(
          `/arrival-points/search?query=${arrivalQuery}`
        );

        const json = await res.json();
        setArrivalSuggestions(json.data || json);

      } finally {
        setLoadingArrival(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);

}, [arrivalQuery]);


    //handle save trip
    const handleSaveTrip = async () => {
        try {
          setSaving(true);

          const payload = {
            package_id: packageId,
            arrival_date: startDate,
            end_date: endDate,
            number_of_days: calculateDays(startDate, endDate),
            arrival_point_id: arrivalPoint?.id,
            adults,
            children: kids,
            children_ages: childrenAges,
            travel_purpose_id: purpose || null,
            stay_option: stay,
            transport_option: transport,
          };

          const isEdit = mode === "trip" && tripId;

          console.log("🚀 PAYLOAD SENT:", payload);

          const res = await apiFetch(
          isEdit
            ? `/trips/${tripId}`
            : `/trips`,
          {
            method: isEdit ? "PUT" : "POST",
            body: JSON.stringify(payload),
          }
        );

          const json = await res.json();

          if (!res.ok) throw json;

          // ⭐ Switch to edit mode after first save
          if (!isEdit) {
            setMode("trip");
            setTripId(json.data.id);
            setTripData(json.data);
          }

        } catch (err) {
          console.error("Save failed:", err);
        } finally {
          setSaving(false);
        }
      };

    
    // Debug mode changes  
    useEffect(() => {
    console.log("🔁 Mode changed:", mode);
    }, [mode]);

    //For auro-saving trip when in edit mode
    useEffect(() => {
  console.log("🧠 AUTOSAVE CHECK", {
    hydrated,
    mode,
    tripId,
    startDate,
  });

  if (!hydrated) {
    console.log("⛔ Autosave blocked — not hydrated");
    return;
  }

  if (mode !== "trip") {
    console.log("⛔ Autosave blocked — not trip mode");
    return;
  }

  console.log("🚀 AUTOSAVE WILL RUN IN 3s");

  const timer = setTimeout(() => {
    console.log("💾 AUTOSAVE EXECUTING");
    handleSaveTrip();
  }, 3000);

  return () => clearTimeout(timer);
}, [
  hydrated,
  startDate,
  adults,
  kids,
  stay,
  transport,
  purpose,
  childrenAges
]);


  // Stepper Component
  const Stepper = ({
    value,
    setValue,
    min = 0,
  }: {
    value: number;
    setValue: (v: number) => void;
    min?: number;
  }) => (
    <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-sm">
      <button
        onClick={() => value > min && setValue(value - 1)}
        className="px-4 py-2 text-lg text-gray-500 hover:bg-gray-50 transition"
      >
        −
      </button>

      <div className="px-6 py-2 text-lg font-semibold text-gray-800">
        {value}
      </div>

      <button
        onClick={() => setValue(value + 1)}
        className="px-4 py-2 text-lg text-gray-500 hover:bg-gray-50 transition"
      >
        +
      </button>
    </div>
  );

  return (
    <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-200 rounded-xl p-6 space-y-6">
      {mode === "trip" && (
        <div className="flex items-center gap-2 text-sm text-gray-600 border-b pb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>

          <span className="font-medium text-gray-700">
            Draft saved
          </span>

          <span className="text-gray-400">•</span>

          <span className="text-gray-500">
            Continue editing itinerary
          </span>
        </div>
      )}
            {/* ================= ROW 1 ================= */}
            <div className="space-y-2">

            <div className="grid md:grid-cols-2 gap-4">
            {/* Travel Purpose */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">
                Travel Purpose
              </label>

              <div className="relative">
                <Plane
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={purpose}
                  onChange={(e) => setPurpose(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                  <option value="">
                    {loadingPurposes ? "Loading..." : "Select purpose"}
                  </option>

                  {travelPurposes.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Arrival Point Autocomplete */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-gray-600">
                Arrival Point
              </label>

              <div className="relative">
                <Compass
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={arrivalQuery}
                  onChange={(e) => {
                    setArrivalQuery(e.target.value);
                    setArrivalPoint(null);
                  }}
                  placeholder="Type airport / railway / city..."
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Suggestions Dropdown */}
              {arrivalSuggestions.length > 0 && !arrivalPoint && (
                <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {arrivalSuggestions.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSelecting(true);
                        setArrivalPoint(item);
                        setArrivalQuery(item.name);
                        setArrivalSuggestions([]);
                      }}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
</div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">
                Start Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                type="date"
                min={minStartDate}
                value={startDate}
                onChange={(e) => {
  const selectedStart = e.target.value;
  console.log("Selected Start:", selectedStart);

  setStartDate(selectedStart);

  if (selectedStart) {
    console.log("Package Days:", packageDays);

    const calculatedEnd = addDays(selectedStart, packageDays);
    console.log("Calculated End:", calculatedEnd);

    setEndDate(calculatedEnd);
  }
}}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">
                End Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                type="date"
                value={endDate || ""}
                disabled
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-gray-100 cursor-not-allowed"
              />
              </div>
            </div>

          </div>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* ================= ROW 2 ================= */}
      <div className="space-y-2">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <label className="text-xs font-medium text-gray-600">
                Adults
              </label>
            <Stepper value={adults} setValue={setAdults} min={1} />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">
                Kids
              </label>
            <Stepper value={kids} setValue={handleKidsChange} />
          </div>
        </div>

        {kids > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Baby size={16} />
              Children’s age at the time of the trip
            </div>

            <div className="flex flex-wrap gap-4">
              {childrenAges.map((age, index) => (
                <select
                  key={index}
                  value={age}
                  onChange={(e) => {
                    const updated = [...childrenAges];
                    updated[index] = Number(e.target.value);
                    setChildrenAges(updated);
                  }}
                  className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[...Array(18)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} yrs
                    </option>
                  ))}
                </select>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-2 italic">
              *Children age at the last day of your trip
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200"></div>

      {/* ================= ROW 3 ================= */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <BedDouble size={18} />
          <span>Stay Options</span>
        </div>

        <div className="flex flex-wrap gap-4">
          {stayOptions.map((option) => (
            <button
              key={option}
              onClick={() => setStay(option)}
              className={`px-6 py-2.5 rounded-xl text-sm border transition-all duration-200 ${
                stay === option
                  ? "bg-black text-white border-black shadow-md"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* ================= ROW 4 ================= */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Car size={18} />
          <span>Transportation</span>
        </div>

        <div className="flex flex-wrap gap-4">
          {transportOptions.map((option) => (
            <button
              key={option}
              onClick={() => setTransport(option)}
              className={`px-6 py-2.5 rounded-xl text-sm border transition-all duration-200 ${
                transport === option
                  ? "bg-black text-white border-black shadow-md"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSaveTrip}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg text-sm font-medium
                    bg-[#f6e27a] text-gray-900
                    hover:opacity-90 transition"
        >
          {saving
            ? "Saving..."
            : mode === "trip"
            ? "Update Trip"
            : "Save Trip"}
        </button>
        </div>
    </div>
  );
}