"use client";

import dynamic from "next/dynamic";
import type { HugeDragonEggZone, LegendaryPal } from "@/lib/types";

const PalworldMap = dynamic(
  () => import("@/components/map/PalworldMap").then((mod) => mod.PalworldMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-[11/10] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-zinc-500">
        טוען מפה…
      </div>
    ),
  },
);

export function MapClient(props: {
  legendaryPals: LegendaryPal[];
  hugeDragonEggZones: HugeDragonEggZone[];
}) {
  return <PalworldMap {...props} />;
}
