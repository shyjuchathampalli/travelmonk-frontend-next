"use client";

import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
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

export default function TripRequestForm() {

  const [purpose, setPurpose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [stay, setStay] = useState("");
  const [transport, setTransport] = useState("");
  const [childrenAges, setChildrenAges] = useState<number[]>([]);

  const [travelPurposes, setTravelPurposes] = useState<any[]>([]);
  const [loadingPurposes, setLoadingPurposes] = useState(true);

    useEffect(() => {
    const fetchTravelPurposes = async () => {
        try {
        const res = await fetch(`${API_BASE_URL}/travel-purposes`);
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

    if (value > childrenAges.length) {
      setChildrenAges([
        ...childrenAges,
        ...Array(value - childrenAges.length).fill(5),
      ]);
    } else {
      setChildrenAges(childrenAges.slice(0, value));
    }
  };

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

            {/* ================= ROW 1 ================= */}
            <div className="space-y-2">

              <div className="grid md:grid-cols-3 gap-4">
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
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
                    >
                    <option value="">
                        {loadingPurposes ? "Loading purposes..." : "Select purpose"}
                    </option>

                    {travelPurposes.map((p: any) => (
                        <option key={p.id} value={p.id}>
                        {p.name}
                        </option>
                    ))}
                    </select>
              </div>
            </div>

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
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
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
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
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
            className="
            px-6 py-2.5
            rounded-lg
            text-sm font-medium
            bg-[#f6e27a]
            text-gray-900
            hover:bg-[#f3db5c]
            transition
            shadow-sm
            hover:shadow-md
            "
        >
            Save Trip
        </button>
        </div>
    </div>
  );
}