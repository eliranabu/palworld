import type { ThreatLevel } from "@/lib/types";

export const THREAT_LEVEL_HE: Record<ThreatLevel, string> = {
  low: "נמוכה",
  moderate: "בינונית",
  high: "גבוהה",
  extreme: "קיצונית",
};

export const THREAT_LEVEL_COLOR: Record<ThreatLevel, string> = {
  low: "text-emerald-300 bg-emerald-400/10",
  moderate: "text-amber-300 bg-amber-400/10",
  high: "text-orange-300 bg-orange-400/10",
  extreme: "text-red-300 bg-red-400/10",
};

const ELEMENT_HE: Record<string, string> = {
  Dragon: "דרקון",
  Ice: "קרח",
  Fire: "אש",
  Dark: "חושך",
  "Neutral (Light)": "ניטרלי (אור)",
};

export function elementToHe(element: string): string {
  return ELEMENT_HE[element] ?? element;
}

export const PAL_TYPE_HE: Record<string, string> = {
  neutral: "ניטרלי",
  grass: "דשא",
  fire: "אש",
  water: "מים",
  electric: "חשמל",
  ice: "קרח",
  ground: "אדמה",
  dark: "חושך",
  dragon: "דרקון",
};

export function palTypeToHe(type: string): string {
  return PAL_TYPE_HE[type] ?? type;
}

export const PAL_TYPE_COLOR: Record<string, string> = {
  neutral: "text-zinc-300 bg-zinc-400/10",
  grass: "text-emerald-300 bg-emerald-400/10",
  fire: "text-orange-300 bg-orange-400/10",
  water: "text-sky-300 bg-sky-400/10",
  electric: "text-yellow-300 bg-yellow-400/10",
  ice: "text-cyan-300 bg-cyan-400/10",
  ground: "text-amber-300 bg-amber-400/10",
  dark: "text-purple-300 bg-purple-400/10",
  dragon: "text-red-300 bg-red-400/10",
};

export function palTypeColor(type: string): string {
  return PAL_TYPE_COLOR[type] ?? "text-zinc-300 bg-zinc-400/10";
}

export const SUITABILITY_HE: Record<string, string> = {
  handiwork: "עבודת יד",
  transporting: "הובלה",
  farming: "חקלאות",
  planting: "שתילה",
  lumbering: "חטיבת עצים",
  medicine_production: "ייצור תרופות",
  gathering: "איסוף",
  kindling: "הבערה",
  watering: "השקיה",
  generating_electricity: "ייצור חשמל",
  mining: "כרייה",
  cooling: "קירור",
  handling: "טיפול",
};

export function suitabilityToHe(type: string): string {
  return SUITABILITY_HE[type] ?? type;
}

export const GENUS_HE: Record<string, string> = {
  humanoid: "אנושאי",
  fourlegged: "ארבע-רגלי",
  bird: "ציפור",
  other: "אחר",
  dragon: "דרקון",
  slow: "איטי",
};

export function genusToHe(genus: string): string {
  return GENUS_HE[genus] ?? genus;
}

export const SIZE_HE: Record<string, string> = {
  xs: "זעיר",
  s: "קטן",
  m: "בינוני",
  l: "גדול",
  xl: "ענק",
};

export function sizeToHe(size: string): string {
  return SIZE_HE[size] ?? size;
}
