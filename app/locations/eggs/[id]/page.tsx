import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hugeDragonEggZones, getHugeDragonEggZoneById } from "@/lib/data";
import { THREAT_LEVEL_HE, THREAT_LEVEL_COLOR } from "@/lib/labels";

export function generateStaticParams() {
  return hugeDragonEggZones.map((zone) => ({ id: zone.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const zone = getHugeDragonEggZoneById(id);
  return {
    title: zone ? `${zone.name} | Palworld Hunter` : "Palworld Hunter",
    description: zone?.notesHe,
  };
}

export default async function EggZonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const zone = getHugeDragonEggZoneById(id);
  if (!zone) notFound();

  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <Link href="/locations" className="mb-6 inline-block text-sm text-zinc-400 hover:text-amber-300">
        ← חזרה למיקומים
      </Link>

      <header className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">{zone.name}</h1>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${THREAT_LEVEL_COLOR[zone.threatLevel]}`}>
            סכנה {THREAT_LEVEL_HE[zone.threatLevel]}
          </span>
        </div>
        <p className="text-zinc-500">{zone.biome} · {zone.region}</p>
      </header>

      <div className="mb-8 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-relaxed text-amber-200/90">
        זהו אזור חיפוש, לא סמן מדויק — הופעות ביצי דרקון ענקיות במשחק הן אקראיות בתוך האזור, לא
        בנקודה קבועה.
      </div>

      <dl className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
        <div>
          <dt className="mb-1 text-xs text-zinc-500">אזור</dt>
          <dd className="text-sm font-medium text-zinc-200">{zone.region}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">שטח</dt>
          <dd className="text-sm font-medium text-zinc-200">{zone.terrain}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">רמה מומלצת</dt>
          <dd className="text-sm font-medium text-zinc-200">{zone.recommendedLevel}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">ציון דרך</dt>
          <dd className="text-sm font-medium text-zinc-200">{zone.anchorLandmark}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">קואורדינטות עוגן</dt>
          <dd dir="ltr" className="text-right text-sm font-medium text-zinc-200">
            {zone.anchorCoords.x}, {zone.anchorCoords.y}
          </dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">גרסה מאומתת</dt>
          <dd className="text-sm font-medium text-zinc-200">{zone.lastVerifiedVersion}</dd>
        </div>
      </dl>

      <div className="mb-8">
        <h2 className="mb-2 text-sm font-semibold text-zinc-300">בקיעות אפשריות</h2>
        <div className="flex flex-wrap gap-2">
          {zone.possibleHatches.map((hatch) => (
            <span key={hatch} className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
              {hatch}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-sm font-semibold text-zinc-300">הערות</h2>
        <p className="text-sm leading-relaxed text-zinc-400">{zone.notesHe}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-zinc-500">
        <span>
          מקורות:{" "}
          {zone.sources.map((source, i) => (
            <span key={source.url}>
              {i > 0 && ", "}
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:text-amber-300"
              >
                {source.label}
              </a>
            </span>
          ))}
        </span>
        <Link href="/map" className="text-amber-400 hover:underline">
          צפייה במפה ←
        </Link>
      </div>
    </div>
  );
}
