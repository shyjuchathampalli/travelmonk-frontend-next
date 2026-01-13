import { CalendarDays, PlaneLanding, Briefcase } from "lucide-react";

export default function TripBasics() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      
      {/* Number of Days */}
      <div className="relative">
        <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="number"
          min={7}
          placeholder="Number of Days (Min 7)"
          className="w-full rounded-lg border border-gray-400 py-3 pl-10 pr-4 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Arrival Location */}
      <div className="relative">
        <PlaneLanding className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <select
          className="w-full appearance-none rounded-lg border border-gray-400 py-3 pl-10 pr-4 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Where do you arrive?</option>
          <option>Kochi Airport</option>
          <option>Trivandrum Airport</option>
          <option>Calicut Airport</option>
        </select>
      </div>

      {/* Travel Purpose */}
      <div className="relative">
        <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <select
          className="w-full appearance-none rounded-lg border border-gray-400 py-3 pl-10 pr-4 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Travel purpose</option>
          <option>Family Trip</option>
          <option>Honeymoon</option>
          <option>Pilgrimage</option>
          <option>Adventure Trip</option>
        </select>
      </div>

    </div>
  );
}
