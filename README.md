# Palworld Hunter

A companion site for Palworld players, starting with **Legendary Pal** spawn locations and **Huge Dragon Egg** hotspot zones, built as a static Next.js app.

## Data honesty policy

Every location in `data/` cites the public guide(s) it's sourced from and the game version it was last verified against. Two spawn types are modeled differently to reflect how they actually work in-game:

- **`legendary-pals.json`** — Legendary Pals (Jetragon, Frostallion, Paladius, Necromus, Blazamut) spawn at a single fixed point, so each entry is a precise, sourced coordinate.
- **`huge-dragon-egg-zones.json`** — Huge Dragon Egg spawns are randomized by the game within known hotspot areas, so each entry is a zone anchored to a real, documented landmark (a fast travel point, city, or dungeon entrance) rather than a fabricated pinpoint or a made-up "confidence score."

There is no live scraping pipeline behind this data — it's a manually researched, cited snapshot. Anyone extending it should follow the same pattern: cite a source, note the game version, and don't invent precision the source doesn't have.

## Tech stack

Next.js (App Router, static export) · TypeScript · Tailwind CSS · Framer Motion · Leaflet (`react-leaflet`, `CRS.Simple`) · Zustand · Fuse.js

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Roadmap

This first release covers Legendary Pals and Huge Dragon Egg zones. The data layer (`lib/types.ts`, `data/*.json`) is structured so it can be extended later to a full encyclopedia — other Pals, bosses, dungeons, and items — without changing the underlying schema shape.
