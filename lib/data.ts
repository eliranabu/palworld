import legendaryPalsRaw from "@/data/legendary-pals.json";
import hugeDragonEggZonesRaw from "@/data/huge-dragon-egg-zones.json";
import spheresRaw from "@/data/items/spheres.json";
import ammoRaw from "@/data/items/ammo.json";
import armorRaw from "@/data/items/armor.json";
import materialsRaw from "@/data/items/materials.json";
import palsRaw from "@/data/pals.json";
import type { HugeDragonEggZone, Item, LegendaryPal, MapMarker, Pal } from "@/lib/types";

export const legendaryPals = legendaryPalsRaw as LegendaryPal[];
export const hugeDragonEggZones = hugeDragonEggZonesRaw as HugeDragonEggZone[];

export const spheres = spheresRaw as Item[];
export const ammo = ammoRaw as Item[];
export const armor = armorRaw as Item[];
export const materials = materialsRaw as Item[];
export const items: Item[] = [...spheres, ...ammo, ...armor, ...materials];

export const pals = palsRaw as Pal[];

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

export function getItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}

export function getPalById(id: number): Pal | undefined {
  return pals.find((pal) => pal.id === id);
}
