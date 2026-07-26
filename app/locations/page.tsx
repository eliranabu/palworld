import type { Metadata } from "next";
import Link from "next/link";
import { Crown, Egg } from "lucide-react";
import { legendaryPals, hugeDragonEggZones } from "@/lib/data";
import { THREAT_LEVEL_HE, THREAT_LEVEL_COLOR, elementToHe } from "@/lib/labels";

export const metadata: Metadata = {
  title: "מיקומים | Palworld Hunter",
  description: "פאלים אגדיים ואזורי ביצי דרקון ענקיות, עם קואורדינטות אמיתיות ומקורות מצוטטים.",
};

export default function LocationsPage() {
  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <header className="mb-12">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-zinc-50">מיקומים</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          פאלים אגדיים מופיעים בנקודה קבועה ומאומתת. ביצי דרקון ענקיות מופיעות באקראי בתוך אזור
          מוכר — לכן הן מוצגות כ&quot;אזורי חיפוש&quot; ולא כסמן מדויק. לחצו על כרטיס לפרטים מלאים,
          או צפו בהם על <Link href="/map" className="text-amber-400 hover:underline">המפה האינטראקטיבית</Link>.
        </p>
      </header>

      <section className="mb-14">
        <div className="mb-5 flex items-center gap-3">
          <Crown className="size-6 text-amber-400" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-zinc-50">פאלים אגדיים</h2>
          <span className="text-sm text-zinc-500">{legendaryPals.length} פאלים</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {legendaryPals.map((pal) => (
            <Link
              key={pal.id}
              href={`/locations/pals/${pal.id}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-amber-400/30 hover:bg-white/[0.07]"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-50">{pal.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${THREAT_LEVEL_COLOR[pal.threatLevel]}`}>
                  {THREAT_LEVEL_HE[pal.threatLevel]}
                </span>
              </div>
              <p className="mb-2 text-xs text-zinc-500">{elementToHe(pal.element)}</p>
              <p className="text-sm text-zinc-400">{pal.region}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center gap-3">
          <Egg className="size-6 text-red-400" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-zinc-50">אזורי ביצי דרקון ענקיות</h2>
          <span className="text-sm text-zinc-500">{hugeDragonEggZones.length} אזורים</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hugeDragonEggZones.map((zone) => (
            <Link
              key={zone.id}
              href={`/locations/eggs/${zone.id}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-red-400/30 hover:bg-white/[0.07]"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-50">{zone.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${THREAT_LEVEL_COLOR[zone.threatLevel]}`}>
                  {THREAT_LEVEL_HE[zone.threatLevel]}
                </span>
              </div>
              <p className="mb-2 text-xs text-zinc-500">{zone.biome}</p>
              <p className="text-sm text-zinc-400">{zone.region}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
