import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint, Star } from "lucide-react";
import { pals } from "@/lib/data";
import { palTypeToHe, palTypeColor, sizeToHe } from "@/lib/labels";

export const metadata: Metadata = {
  title: "פאלים | Palworld Hunter",
  description: "מאגר יצורי הפאלים של Palworld, עם סטטיסטיקות אמיתיות ותיאורים בעברית.",
};

export default function PalsPage() {
  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <header className="mb-12">
        <div className="mb-3 flex items-center gap-3">
          <PawPrint className="size-8 text-amber-400" aria-hidden="true" />
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">פאלים</h1>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          {pals.length} פאלים מתוך 287 שקיימים במשחק (1.0) — ההתחלה של הפאלדקס, לא הכל עדיין. כל
          פאל כולל סטטיסטיקות אמיתיות, סוגי אלמנט, התאמת עבודה, ותיאור מתורגם. שמות המינים נשארים
          באנגלית — כך משתמשת בהם הקהילה, אין להם מקבילה רשמית בעברית.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pals.map((pal) => (
          <Link
            key={pal.id}
            href={`/pals/${pal.id}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-amber-400/30 hover:bg-white/[0.07]"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-50">{pal.name}</h3>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Star className="size-3" fill="currentColor" aria-hidden="true" />
                {pal.rarity}
              </span>
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {pal.types.map((type) => (
                <span
                  key={type}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${palTypeColor(type)}`}
                >
                  {palTypeToHe(type)}
                </span>
              ))}
            </div>
            <p className="text-sm text-zinc-400">גודל: {sizeToHe(pal.size)}</p>
          </Link>
        ))}
      </div>

      <section className="mt-14 rounded-2xl border border-dashed border-white/15 p-6">
        <h2 className="mb-2 text-lg font-semibold text-zinc-200">כיסוי חלקי</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          זהו רק מספר הפאלדקס {pals[0].id}–{pals[pals.length - 1].id} מתוך 287 פאלים במשחק. שאר
          הפאלים (כולל הפאלים האגדיים שכבר מכוסים בעמוד{" "}
          <Link href="/locations" className="text-amber-400 hover:underline">
            מיקומים
          </Link>
          ) יתווספו בהמשך.
        </p>
      </section>
    </div>
  );
}
