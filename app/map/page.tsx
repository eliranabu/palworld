import type { Metadata } from "next";
import { MapClient } from "@/components/map/MapClient";
import { legendaryPals, hugeDragonEggZones } from "@/lib/data";

export const metadata: Metadata = {
  title: "מפה אינטראקטיבית | Palworld Hunter",
  description: "מפת ייחוס מעוצבת עם מיקומי פאלים אגדיים ואזורי ביצי דרקון ענקיות.",
};

export default function MapPage() {
  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-zinc-50">
          מפה אינטראקטיבית
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          זוהי מפת ייחוס מעוצבת ומצוירת מחדש — לא צילום מסך רשמי של המשחק. המיקומים על גביה מבוססים
          על הקואורדינטות האמיתיות מהמאגר, אך עיצוב הרקע הוא אמנותי וסכמטי בלבד. לחצו על סמל כדי
          לראות פרטים.
        </p>
      </header>
      <MapClient legendaryPals={legendaryPals} hugeDragonEggZones={hugeDragonEggZones} />

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
        <span className="font-semibold text-zinc-300">מקרא:</span>
        <span className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-zinc-950">
            ★
          </span>
          פאל אגדי — נקודה מדויקת
        </span>
        <span className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-zinc-950">
            ◎
          </span>
          אזור ביצת דרקון ענקית — סמן קירוב, לא נקודה מדויקת
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-orange-700/70" />
          וולקני
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-sky-200/70" />
          שלג
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-amber-600/70" />
          מדבר
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-teal-400/70" />
          חוף
        </span>
      </div>
    </div>
  );
}
