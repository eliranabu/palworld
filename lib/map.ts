import type { MapCoords } from "@/lib/types";

export const MAP_BOUNDS = {
  minX: -900,
  maxX: 900,
  minY: -850,
  maxY: 800,
} as const;

export const MAP_IMAGE_URL = "/maps/palpagos-stylized.svg";

/**
 * Leaflet (CRS.Simple) LatLngBounds corners, as plain [lat, lng] tuples so
 * callers don't need to import Leaflet types in server components.
 */
export const MAP_LATLNG_BOUNDS: [[number, number], [number, number]] = [
  [MAP_BOUNDS.minY, MAP_BOUNDS.minX],
  [MAP_BOUNDS.maxY, MAP_BOUNDS.maxX],
];

/** Converts an in-game (x, y) coordinate to a Leaflet [lat, lng] pair. */
export function coordsToLatLng(coords: MapCoords): [number, number] {
  return [coords.y, coords.x];
}
