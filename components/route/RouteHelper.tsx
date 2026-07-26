"use client";

import { useMemo, useState } from "react";
import { Route as RouteIcon, MapPin } from "lucide-react";
import { computeNearestNeighborRoute, type RoutePoint } from "@/lib/route";

export function RouteHelper({ points }: { points: RoutePoint[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function toggle(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }

  const selectedPoints = useMemo(
    () => selectedIds.map((id) => points.find((p) => p.id === id)!).filter(Boolean),
    [selectedIds, points],
  );

  const result = useMemo(
    () => computeNearestNeighborRoute(selectedPoints),
    [selectedPoints],
  );

  return (
    <div dir="rtl" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <h2 className="mb-3 text-sm font-semibold text-zinc-300">
          בחרו יעדים ({selectedIds.length})
        </h2>
        <div className="max-h-[28rem] space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
          {points.map((point) => (
            <label
              key={point.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(point.id)}
                onChange={() => toggle(point.id)}
                className="size-4 accent-amber-400"
              />
              <span className="text-sm text-zinc-200">{point.title}</span>
              <span dir="ltr" className="mr-auto text-xs text-zinc-500">
                {point.coords.x}, {point.coords.y}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <RouteIcon className="size-4 text-amber-400" aria-hidden="true" />
          מסלול מוצע
        </h2>
        {selectedIds.length < 2 ? (
          <p className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-zinc-500">
            בחרו לפחות שני יעדים כדי לחשב מסלול.
          </p>
        ) : (
          <div className="space-y-2">
            {result.steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-xs font-bold text-amber-300">
                  {step.order}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-zinc-200">
                  <MapPin className="size-3.5 text-zinc-500" aria-hidden="true" />
                  {step.title}
                </span>
                {step.order > 1 && (
                  <span dir="ltr" className="mr-auto text-xs text-zinc-500">
                    +{Math.round(step.distanceFromPrev)} יח&apos;
                  </span>
                )}
              </div>
            ))}
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-sm text-amber-200/90">
              מרחק כולל משוער: {Math.round(result.totalDistance)} יחידות קואורדינטה (קו ישר, ללא
              התחשבות בטופוגרפיה, מהירות רכיבה, או תנועה בפועל).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
