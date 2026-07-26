"use client";

import { CheckCircle2, Circle, Star } from "lucide-react";
import { useProgressStore } from "@/store/progress";
import { useHasMounted } from "@/lib/use-has-mounted";

export function TrackButtons({ id, showVisited = true }: { id: string; showVisited?: boolean }) {
  const mounted = useHasMounted();
  const visited = useProgressStore((s) => s.visited[id]);
  const bookmarked = useProgressStore((s) => s.bookmarks[id]);
  const toggleVisited = useProgressStore((s) => s.toggleVisited);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);

  return (
    <div className="flex items-center gap-2">
      {showVisited && (
        <button
          type="button"
          onClick={() => toggleVisited(id)}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            mounted && visited
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-white/15 bg-white/5 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {mounted && visited ? (
            <CheckCircle2 className="size-3.5" aria-hidden="true" />
          ) : (
            <Circle className="size-3.5" aria-hidden="true" />
          )}
          {mounted && visited ? "בוקר" : "סמן כמבוקר"}
        </button>
      )}
      <button
        type="button"
        onClick={() => toggleBookmark(id)}
        aria-label="הוסף למועדפים"
        className={`flex items-center justify-center rounded-full border p-1.5 transition-colors ${
          mounted && bookmarked
            ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
            : "border-white/15 bg-white/5 text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <Star className="size-3.5" fill={mounted && bookmarked ? "currentColor" : "none"} aria-hidden="true" />
      </button>
    </div>
  );
}
