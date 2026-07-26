export type MapCoords = {
  x: number;
  y: number;
};

export type SpawnType = "fixed" | "zone";

export type ThreatLevel = "low" | "moderate" | "high" | "extreme";

export type SourceRef = {
  label: string;
  url: string;
};

/**
 * A Legendary Pal has a single, fixed overworld spawn point (not randomized),
 * as documented by community mapping guides.
 */
export type LegendaryPal = {
  id: string;
  name: string;
  element: string;
  spawnType: "fixed";
  coords: MapCoords;
  region: string;
  biome: string;
  nearestFastTravel: string;
  recommendedLevel: number;
  threatLevel: ThreatLevel;
  nearbyLandmarks: string[];
  notes: string;
  notesHe: string;
  sources: SourceRef[];
  lastVerifiedVersion: string;
};

/**
 * Huge Dragon Egg spawns are randomized within a known hotspot area rather
 * than a fixed point, so each entry represents a reported hotspot zone
 * anchored to a real landmark/fast-travel point, not a guaranteed marker.
 */
export type HugeDragonEggZone = {
  id: string;
  name: string;
  spawnType: "zone";
  anchorCoords: MapCoords;
  anchorLandmark: string;
  region: string;
  biome: string;
  terrain: string;
  possibleHatches: string[];
  recommendedLevel: number;
  threatLevel: ThreatLevel;
  notes: string;
  notesHe: string;
  sources: SourceRef[];
  lastVerifiedVersion: string;
};

export type MapMarker =
  | ({ kind: "legendary-pal" } & LegendaryPal)
  | ({ kind: "huge-dragon-egg-zone" } & HugeDragonEggZone);

export type ItemCategory = "sphere" | "ammo" | "weapon" | "armor" | "material" | "consumable";

/**
 * Palworld has no official Hebrew localization, so `nameHe` is a careful
 * fan translation, not an official in-game string. `nameEn` is kept
 * alongside every entry so the original/official name is never lost.
 */
export type Item = {
  id: string;
  nameEn: string;
  nameHe: string;
  category: ItemCategory;
  tier?: number;
  descriptionHe: string;
  howToObtainHe: string;
  sources: SourceRef[];
  lastVerifiedVersion: string;
};

export type PalSuitability = {
  type: string;
  level: number;
};

export type PalStats = {
  hp: number;
  attackMelee: number;
  attackRanged: number;
  defense: number;
  speedRun: number;
  stamina: number;
};

/**
 * Regular (non-Legendary) Pal roster entry. Data (stats, types, suitability,
 * descriptions) sourced from the MIT-licensed palworld-paldex-api dataset;
 * `descriptionHe` is a fan translation of the official English flavor text.
 * Names are kept in English (`name`) — there's no official Hebrew
 * localization and community usage sticks to the original species names,
 * same convention as Legendary Pals.
 */
export type Pal = {
  id: number;
  name: string;
  types: string[];
  descriptionHe: string;
  stats: PalStats;
  suitability: PalSuitability[];
  rarity: number;
  genus: string;
  price: number;
  size: string;
  sources: SourceRef[];
  lastVerifiedVersion: string;
};
