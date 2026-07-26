import legendaryPalsRaw from "@/data/legendary-pals.json";
import hugeDragonEggZonesRaw from "@/data/huge-dragon-egg-zones.json";
import type { HugeDragonEggZone, LegendaryPal, MapMarker } from "@/lib/types";

export const legendaryPals = legendaryPalsRaw as LegendaryPal[];
export const hugeDragonEggZones = hugeDragonEggZonesRaw as HugeDragonEggZone[];

export const mapMarkers: MapMarker[] = [
  ...legendaryPals.map((pal) => ({ kind: "legendary-pal" as const, ...pal })),
  ...hugeDragonEggZones.map((zone) => ({
    kind: "huge-dragon-egg-zone" as const,
    ...zone,
  })),
];

export function getLegendaryPalById(id: string): LegendaryPal | undefined {
  return legendaryPals.find((pal) => pal.id === id);
}

export function getHugeDragonEggZoneById(
  id: string,
): HugeDragonEggZone | undefined {
  return hugeDragonEggZones.find((zone) => zone.id === id);
}
