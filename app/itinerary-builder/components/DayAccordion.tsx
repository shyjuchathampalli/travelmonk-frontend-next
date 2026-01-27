"use client";

import { useState } from "react";
import DayCard from "./DayCard";

const days = Array.from({ length: 7 }, (_, i) => i + 1);

export default function DayAccordion() {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="mt-6 space-y-5">
      {days.map((day) => (
        <DayCard
          key={day}
          day={day}
          isOpen={activeDay === day}
          onToggle={() => setActiveDay(day)}
        />
      ))}
    </div>
  );
}
