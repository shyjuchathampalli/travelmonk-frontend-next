import { ChevronDown, CalendarDays, Save } from "lucide-react";
import DayActivities from "./DayActivities";
import DayPreferences from "./DayPreferences";
import DayCommentBox from "./DayCommentBox";

export default function DayCard({
  day,
  isOpen,
  onToggle,
}: {
  day: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 transition hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 text-gray-800">
          <CalendarDays className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-semibold">Day {day}</span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-gray-200 px-5 py-5 space-y-6 animate-[fadeIn_0.2s_ease-out]">
          <DayActivities />
          <DayPreferences />
          <DayCommentBox />

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="
                flex items-center gap-2 rounded-lg
                bg-teal-700 px-4 py-2 text-sm font-semibold text-white
                shadow-sm transition
                hover:bg-teal-800
              "
            >
              <Save className="h-4 w-4" />
              Save day details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
