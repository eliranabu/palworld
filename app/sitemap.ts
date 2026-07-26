import type { MetadataRoute } from "next";
import { legendaryPals, hugeDragonEggZones } from "@/lib/data";

export const dynamic = "force-static";

// Placeholder until the site has a real deployed domain — update after
// the first Netlify deploy (see README "Deployment").
const BASE_URL = "https://palworld-hunter.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/items", "/locations", "/map", "/route", "/progress"].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const palRoutes = legendaryPals.map((pal) => ({
    url: `${BASE_URL}/locations/pals/${pal.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const eggRoutes = hugeDragonEggZones.map((zone) => ({
    url: `${BASE_URL}/locations/eggs/${zone.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...palRoutes, ...eggRoutes];
}
