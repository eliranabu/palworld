import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pals, getPalById } from "@/lib/data";
import { palTypeToHe, palTypeColor, suitabilityToHe, genusToHe, sizeToHe } from "@/lib/labels";
import { TrackButtons } from "@/components/progress/TrackButtons";
import { PersonalImage } from "@/components/personal-image/PersonalImage";

export function generateStaticParams() {
  return pals.map((pal) => ({ id: String(pal.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pal = getPalById(Number(id));
  return {
    title: pal ? `${pal.name} | Palworld Hunter` : "Palworld Hunter",
    description: pal?.descriptionHe,
  };
}

const STAT_LABELS: { key: "hp" | "attackMelee" | "attackRanged" | "defense" | "speedRun" | "stamina"; label: string }[] = [
  { key: "hp", label: "בריאות" },
  { key: "attackMelee", label: "התקפה קרובה" },
  { key: "attackRanged", label: "התקפה מרחוק" },
  { key: "defense", label: "הגנה" },
  { key: "speedRun", label: "מהירות ריצה" },
  { key: "stamina", label: "סיבולת" },
];

export default async function PalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pal = getPalById(Number(id));
  if (!pal) notFound();

  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <Link href="/pals" className="mb-6 inline-block text-sm text-zinc-400 hover:text-amber-300">
        ← חזרה לפאלים
      </Link>

      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-28 shrink-0">
            <PersonalImage id={`palroster-${pal.id}`} alt={pal.name} />
          </div>
          <div>
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-zinc-50">{pal.name}</h1>
            <div className="flex flex-wrap gap-1.5">
              {pal.types.map((type) => (
                <span
                  key={type}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${palTypeColor(type)}`}
                >
                  {palTypeToHe(type)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <TrackButtons id={`palroster-${pal.id}`} showVisited={false} />
      </header>

      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm leading-relaxed text-zinc-300">{pal.descriptionHe}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-zinc-300">סטטיסטיקות</h2>
        <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
          {STAT_LABELS.map(({ key, label }) => (
            <div key={key}>
              <dt className="mb-1 text-xs text-zinc-500">{label}</dt>
              <dd className="text-sm font-medium text-zinc-200">{pal.stats[key]}</dd>
            </div>
          ))}
          <div>
            <dt className="mb-1 text-xs text-zinc-500">נדירות</dt>
            <dd className="text-sm font-medium text-zinc-200">{pal.rarity}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs text-zinc-500">סוג מבנה גוף</dt>
            <dd className="text-sm font-medium text-zinc-200">{genusToHe(pal.genus)}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs text-zinc-500">גודל</dt>
            <dd className="text-sm font-medium text-zinc-200">{sizeToHe(pal.size)}</dd>
          </div>
        </dl>
      </div>

      {pal.suitability.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-zinc-300">התאמת עבודה</h2>
          <div className="flex flex-wrap gap-2">
            {pal.suitability.map((s) => (
              <span
                key={s.type}
                className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-zinc-300"
              >
                {suitabilityToHe(s.type)} · רמה {s.level}
              </span>
            ))}
          </div>
        </div>
      )}

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
        <span>גרסה מאומתת: {pal.lastVerifiedVersion}</span>
      </div>
    </div>
  );
}
