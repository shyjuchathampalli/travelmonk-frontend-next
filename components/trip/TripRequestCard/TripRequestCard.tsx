import { MapPin, CalendarDays, Plane } from "lucide-react";
import GuestsCounter from "./GuestsCounter";
import InterestSelector from "./InterestSelector";
import { State } from "@/services/states";

type TripRequestCardProps = {
  state?: State;
};

export default function TripRequestCard({ state }: TripRequestCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-6 w-full">

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <InputBox
          icon={<MapPin />}
          placeholder={`Travel purpose in ${state?.name}`}
        />

        <InputBox
          icon={<CalendarDays />}
          placeholder="Minimum 7 days"
        />

        <InputBox
          icon={<Plane />}
          placeholder="Arrival city"
        />

      </div>

      {/* Guests */}
      <div className="mt-6 flex flex-wrap gap-8">
        <GuestsCounter label="Number of Adults" defaultValue={2} />
        <GuestsCounter label="Number of Kids" defaultValue={2} />
      </div>

      {/* Interests */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-700 mb-4">
          Where would you like to go in {state?.name}?
        </h4>
        <InterestSelector />
      </div>

    </div>
  );
}

function InputBox({
  icon,
  placeholder,
}: {
  icon: React.ReactNode;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 text-gray-500">
      <span className="text-gray-400">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-sm"
      />
    </div>
  );
}
