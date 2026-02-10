"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function GuestsCounter({
  label,
  defaultValue = 0,
}: {
  label: string;
  defaultValue?: number;
}) {
  const [count, setCount] = useState(defaultValue);

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">{label}</span>

      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
        <button onClick={() => setCount(Math.max(0, count - 1))}>
          <Minus size={14} />
        </button>

        <span className="w-6 text-center text-sm">{count}</span>

        <button onClick={() => setCount(count + 1)}>
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
