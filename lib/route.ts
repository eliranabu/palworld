import type { MapCoords } from "@/lib/types";

export type RoutePoint = {
  id: string;
  title: string;
  coords: MapCoords;
};

export type RouteStep = RoutePoint & {
  order: number;
  distanceFromPrev: number;
};

function distance(a: MapCoords, b: MapCoords): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Greedy nearest-neighbor ordering starting from the first point in the
 * input array. This is a straight-line-distance estimate in game
 * coordinate units, not a calibrated travel-time prediction — it doesn't
 * account for terrain, mounts, or actual movement speed.
 */
export function computeNearestNeighborRoute(points: RoutePoint[]): {
  steps: RouteStep[];
  totalDistance: number;
} {
  if (points.length === 0) return { steps: [], totalDistance: 0 };

  const remaining = [...points];
  const start = remaining.shift()!;
  const steps: RouteStep[] = [{ ...start, order: 1, distanceFromPrev: 0 }];
  let current = start;
  let total = 0;

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = distance(current.coords, remaining[i].coords);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIndex = i;
      }
    }
    const [next] = remaining.splice(nearestIndex, 1);
    total += nearestDist;
    steps.push({ ...next, order: steps.length + 1, distanceFromPrev: nearestDist });
    current = next;
  }

  return { steps, totalDistance: total };
}
