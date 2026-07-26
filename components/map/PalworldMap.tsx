"use client";

import { useMemo, useState } from "react";
import { MapContainer, ImageOverlay, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { Maximize2, Minimize2, Egg, Crown } from "lucide-react";
import { MAP_IMAGE_URL, MAP_LATLNG_BOUNDS, coordsToLatLng } from "@/lib/map";
import type { HugeDragonEggZone, LegendaryPal } from "@/lib/types";

type Props = {
  legendaryPals: LegendaryPal[];
  hugeDragonEggZones: HugeDragonEggZone[];
};

type Selected =
  | { kind: "legendary-pal"; data: LegendaryPal }
  | { kind: "huge-dragon-egg-zone"; data: HugeDragonEggZone }
  | null;

function markerIcon(kind: "legendary-pal" | "huge-dragon-egg-zone") {
  const color = kind === "legendary-pal" ? "#fbbf24" : "#f87171";
  const symbol = kind === "legendary-pal" ? "★" : "◎";
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 26px; height: 26px; border-radius: 9999px;
      background: ${color}; color: #0a0a0f; font-size: 13px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid rgba(10,10,15,0.6); box-shadow: 0 0 0 2px ${color}55, 0 2px 6px rgba(0,0,0,0.5);
    ">${symbol}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

function FitBounds() {
  const map = useMap();
  useMemo(() => {
    map.fitBounds(MAP_LATLNG_BOUNDS, { padding: [20, 20] });
  }, [map]);
  return null;
}

function FullscreenToggle({
  isFullscreen,
  onToggle,
}: {
  isFullscreen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute left-3 top-3 z-[1000] flex size-9 items-center justify-center rounded-lg border border-white/15 bg-black/60 text-zinc-200 backdrop-blur-sm transition-colors hover:bg-black/80"
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
    </button>
  );
}

export function PalworldMap({ legendaryPals, hugeDragonEggZones }: Props) {
  const [showLegendary, setShowLegendary] = useState(true);
  const [showEggZones, setShowEggZones] = useState(true);
  const [selected, setSelected] = useState<Selected>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const legendaryIcon = useMemo(() => markerIcon("legendary-pal"), []);
  const eggIcon = useMemo(() => markerIcon("huge-dragon-egg-zone"), []);

  return (
    <div className="flex flex-col gap-4 lg:flex-row" dir="rtl">
      <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-stretch lg:gap-2">
        <button
          type="button"
          onClick={() => setShowLegendary((v) => !v)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
            showLegendary
              ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
              : "border-white/10 bg-white/5 text-zinc-500"
          }`}
        >
          <Crown className="size-4" />
          פאלים אגדיים ({legendaryPals.length})
        </button>
        <button
          type="button"
          onClick={() => setShowEggZones((v) => !v)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
            showEggZones
              ? "border-red-400/40 bg-red-400/10 text-red-300"
              : "border-white/10 bg-white/5 text-zinc-500"
          }`}
        >
          <Egg className="size-4" />
          אזורי ביצי דרקון ({hugeDragonEggZones.length})
        </button>

        {selected && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4 lg:w-72">
            <h3 className="mb-1 text-base font-bold text-zinc-50">{selected.data.name}</h3>
            <p dir="ltr" className="mb-3 text-left text-xs text-zinc-500">
              {"element" in selected.data ? selected.data.element : selected.data.anchorLandmark}
            </p>
            {selected.kind === "legendary-pal" ? (
              <dl className="space-y-1.5 text-sm text-zinc-300">
                <div>
                  <dt className="inline text-zinc-500">אזור: </dt>
                  <dd className="inline">{selected.data.region}</dd>
                </div>
                <div>
                  <dt className="inline text-zinc-500">רמה מומלצת: </dt>
                  <dd className="inline">{selected.data.recommendedLevel}</dd>
                </div>
                <div>
                  <dt className="inline text-zinc-500">קואורדינטות: </dt>
                  <dd dir="ltr" className="inline">
                    {selected.data.coords.x}, {selected.data.coords.y}
                  </dd>
                </div>
              </dl>
            ) : (
              <dl className="space-y-1.5 text-sm text-zinc-300">
                <div>
                  <dt className="inline text-zinc-500">אזור: </dt>
                  <dd className="inline">{selected.data.region}</dd>
                </div>
                <div>
                  <dt className="inline text-zinc-500">רמה מומלצת: </dt>
                  <dd className="inline">{selected.data.recommendedLevel}</dd>
                </div>
              </dl>
            )}
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">{selected.data.notesHe}</p>
          </div>
        )}
      </div>

      <div
        className={
          isFullscreen
            ? "fixed inset-0 z-[999] bg-background"
            : "relative aspect-[11/10] w-full overflow-hidden rounded-2xl border border-white/10"
        }
      >
        <FullscreenToggle isFullscreen={isFullscreen} onToggle={() => setIsFullscreen((v) => !v)} />
        <MapContainer
          crs={L.CRS.Simple}
          center={[0, 0]}
          zoom={-1}
          minZoom={-3}
          maxZoom={2}
          zoomSnap={0.25}
          maxBounds={MAP_LATLNG_BOUNDS}
          maxBoundsViscosity={0.8}
          className="size-full bg-[#071c2b]"
          attributionControl={false}
        >
          <FitBounds />
          <ImageOverlay url={MAP_IMAGE_URL} bounds={MAP_LATLNG_BOUNDS} />

          {showLegendary &&
            legendaryPals.map((pal) => (
              <Marker
                key={pal.id}
                position={coordsToLatLng(pal.coords)}
                icon={legendaryIcon}
                eventHandlers={{ click: () => setSelected({ kind: "legendary-pal", data: pal }) }}
              />
            ))}

          {showEggZones &&
            hugeDragonEggZones.map((zone) => (
              <Marker
                key={zone.id}
                position={coordsToLatLng(zone.anchorCoords)}
                icon={eggIcon}
                eventHandlers={{
                  click: () => setSelected({ kind: "huge-dragon-egg-zone", data: zone }),
                }}
              />
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
