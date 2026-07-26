import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legendaryPals, getLegendaryPalById } from "@/lib/data";
import { THREAT_LEVEL_HE, THREAT_LEVEL_COLOR, elementToHe } from "@/lib/labels";

export function generateStaticParams() {
  return legendaryPals.map((pal) => ({ id: pal.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pal = getLegendaryPalById(id);
  return {
    title: pal ? `${pal.name} | Palworld Hunter` : "Palworld Hunter",
    description: pal?.notesHe,
  };
}

export default async function LegendaryPalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pal = getLegendaryPalById(id);
  if (!pal) notFound();

  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <Link href="/locations" className="mb-6 inline-block text-sm text-zinc-400 hover:text-amber-300">
        ← חזרה למיקומים
      </Link>

      <header className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">{pal.name}</h1>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${THREAT_LEVEL_COLOR[pal.threatLevel]}`}>
            סכנה {THREAT_LEVEL_HE[pal.threatLevel]}
          </span>
        </div>
        <p className="text-zinc-500">{elementToHe(pal.element)} · {pal.region}</p>
      </header>

      <dl className="mb-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
        <div>
          <dt className="mb-1 text-xs text-zinc-500">אזור</dt>
          <dd className="text-sm font-medium text-zinc-200">{pal.region}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">ביומה</dt>
          <dd className="text-sm font-medium text-zinc-200">{pal.biome}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">רמה מומלצת</dt>
          <dd className="text-sm font-medium text-zinc-200">{pal.recommendedLevel}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">נקודת העברה קרובה</dt>
          <dd className="text-sm font-medium text-zinc-200">{pal.nearestFastTravel}</dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">קואורדינטות</dt>
          <dd dir="ltr" className="text-right text-sm font-medium text-zinc-200">
            {pal.coords.x}, {pal.coords.y}
          </dd>
        </div>
        <div>
          <dt className="mb-1 text-xs text-zinc-500">גרסה מאומתת</dt>
          <dd className="text-sm font-medium text-zinc-200">{pal.lastVerifiedVersion}</dd>
        </div>
      </dl>

      <div className="mb-8">
        <h2 className="mb-2 text-sm font-semibold text-zinc-300">ציוני דרך קרובים</h2>
        <div className="flex flex-wrap gap-2">
          {pal.nearbyLandmarks.map((landmark) => (
            <span key={landmark} className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
              {landmark}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-2 text-sm font-semibold text-zinc-300">הערות</h2>
        <p className="text-sm leading-relaxed text-zinc-400">{pal.notesHe}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-zinc-500">
        <span>
          מקורות:{" "}
          {pal.sources.map((source, i) => (
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
