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
