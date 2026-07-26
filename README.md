# Palworld Hunter

A companion site for Palworld players: Legendary Pal spawn locations, Huge Dragon Egg hotspot zones, an interactive reference map, a Hebrew-translated item database, instant search, personal progress tracking, and a route planner. Built as a static Next.js app — no backend, no database, deployable as a plain folder of static files.

## Features

- **`/locations`** — Legendary Pals (fixed spawns) and Huge Dragon Egg zones (randomized hotspots), with statically-generated detail pages per entry
- **`/items`** — item database translated into proper Hebrew (spheres, ammo, base armor sets, core materials so far — see "כיסוי חלקי" note on the page itself for what's not yet covered)
- **`/map`** — Leaflet map on a custom stylized reference image, with category filters and a click-to-select detail panel
- **`/route`** — pick multiple locations, get a suggested visit order via nearest-neighbor on their coordinates
- **`/progress`** — visited marks, bookmarks, and personal notes, all local (`localStorage`), with JSON export/import for backup
- Instant search (Cmd/Ctrl+K) over items and locations
- PWA: installable, works offline for previously-visited pages (service worker at `public/sw.js`)

## Data honesty policy

Every entry in `data/` cites the public guide(s) it's sourced from and the game version it was last verified against. There is no live scraping pipeline — it's a manually researched, cited snapshot. Anyone extending it should follow the same pattern: cite a source, note the game version, and don't invent precision the source doesn't have. A few concrete conventions already in place:

- **`legendary-pals.json`** — Legendary Pals spawn at a single fixed point, so each entry is a precise, sourced coordinate.
- **`huge-dragon-egg-zones.json`** — Huge Dragon Egg spawns are randomized within known hotspot areas, so each entry is a zone anchored to a real, documented landmark rather than a fabricated pinpoint.
- **`data/items/*.json`** — every item has both `nameEn` (the original name) and `nameHe` (the fan translation), since Palworld has no official Hebrew localization. Prefer native Hebrew words over transliterated English loanwords where a proper equivalent exists (e.g. אגדי, not לג'נדרי).
- **No item icons/screenshots are embedded** — the game's official art is Pocketpair's copyright, and no public fan-content policy was found that clearly licenses redistributing it on a third-party site. Category icons are simple Lucide glyphs instead; each item card links out to its cited source instead.

## Tech stack

Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · Framer Motion · Leaflet (`react-leaflet`, `CRS.Simple`) · Zustand (with `persist`) · Fuse.js · Lucide icons

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run lint
```

## Deployment (Netlify)

`netlify.toml` is already set up: build command `npm run build`, publish directory `out`. Connect the repo in Netlify and it should deploy with no further configuration. After the first deploy, update the placeholder domain in `app/sitemap.ts` and `app/robots.ts` (currently `https://palworld-hunter.netlify.app`) to match the real URL.

## Extending the data layer

The schema (`lib/types.ts`) is intentionally generic so it can grow into a full encyclopedia later — other Pals, bosses, dungeons, weapons, consumables — without changing shape:

1. Add a typed entry to the relevant `data/*.json` file (or a new file under `data/items/` for a new item category), following the existing fields exactly — every entry needs `sources` and `lastVerifiedVersion`.
2. If it's a new item category, add it to `ItemCategory` in `lib/types.ts` and to `CATEGORY_LABELS`/`CATEGORY_ICONS` in `app/items/page.tsx`.
3. Wire it into `lib/data.ts` so it's picked up by search (`lib/search.ts`), the map (if it has coordinates), and the route planner.
4. Run `npm run build` and confirm the static export still succeeds before committing.
