"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getLucideIcon } from "@/lib/getLucideIcon";
import {
  fetchDestinationCategories,
  DestinationCategory,
} from "@/services/destinationCategories";

const PAGE_SIZE = 20;

export default function InterestSelector() {
  const [categories, setCategories] = useState<DestinationCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchDestinationCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-400">Loading interests…</div>;
  }

  const totalPages = Math.ceil(categories.length / PAGE_SIZE);

  const visibleCategories = categories.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

return (
  <div className="flex items-center gap-3 w-full overflow-hidden">
    {/* Left Arrow */}
    <button
      type="button"
      onClick={() => setPage((p) => Math.max(p - 1, 0))}
      disabled={page === 0}
      className="shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-700 disabled:opacity-30"
    >
      <ChevronLeft size={18} />
    </button>

    {/* Categories – HARD CONSTRAINED */}
    <div className="flex-1 overflow-hidden">
      <div
        className="
          grid
          grid-cols-10
          gap-x-6
          gap-y-2
          text-gray-400
        "
      >
        {visibleCategories.map((category) => {
          const Icon = getLucideIcon(category.icon);

          return (
            <button
              key={category.id}
              type="button"
              className="
                flex flex-col items-center gap-2
                hover:text-gray-700 transition
                min-w-0
              "
            >
              <Icon size={22} />
              <span className="text-[11px] text-center leading-tight line-clamp-2">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>

    {/* Right Arrow */}
    <button
      type="button"
      onClick={() =>
        setPage((p) => Math.min(p + 1, totalPages - 1))
      }
      disabled={page === totalPages - 1}
      className="shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-700 disabled:opacity-30"
    >
      <ChevronRight size={18} />
    </button>
  </div>
);
}
