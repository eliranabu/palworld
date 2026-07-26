import { items, legendaryPals, hugeDragonEggZones } from "@/lib/data";
import { elementToHe } from "@/lib/labels";

export type SearchDoc = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  keywords: string;
  href: string;
};

export function buildSearchIndex(): SearchDoc[] {
  const itemDocs: SearchDoc[] = items.map((item) => ({
    id: `item-${item.id}`,
    title: item.nameHe,
    subtitle: item.nameEn,
    category: "פריט",
    keywords: "",
    href: `/items#${item.id}`,
  }));

  const palDocs: SearchDoc[] = legendaryPals.map((pal) => ({
    id: `pal-${pal.id}`,
    title: pal.name,
    subtitle: pal.region,
    category: "פאל אגדי",
    keywords: `פאל אגדי ${elementToHe(pal.element)} ${pal.biome}`,
    href: `/locations/pals/${pal.id}`,
  }));

  const eggDocs: SearchDoc[] = hugeDragonEggZones.map((zone) => ({
    id: `egg-${zone.id}`,
    title: zone.name,
    subtitle: zone.region,
    category: "אזור ביצה",
    keywords: `ביצת דרקון ענקית אזור ביצים ${zone.biome}`,
    href: `/locations/eggs/${zone.id}`,
  }));

  return [...itemDocs, ...palDocs, ...eggDocs];
}
