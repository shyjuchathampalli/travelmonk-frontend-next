"use client";

import { MessageSquare, Plus } from "lucide-react";
import { useState } from "react";

export default function DayCommentBox() {
  const [comment, setComment] = useState("");

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
        <MessageSquare className="h-4 w-4" />
        Suggestions or Notes
      </label>

      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add timing preferences, special requests or notes for this day…"
        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm
                   focus:border-teal-600 focus:ring-1 focus:ring-teal-600
                   transition"
      />

      {/* Add Comment Button */}
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          disabled={!comment.trim()}
          className={`
            flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm
            transition
            ${
              comment.trim()
                ? "cursor-pointer text-teal-700 hover:bg-teal-50"
                : "cursor-not-allowed text-gray-400"
            }
          `}
        >
          <Plus className="h-4 w-4" />
          Add comment
        </button>
      </div>
    </div>
  );
}
