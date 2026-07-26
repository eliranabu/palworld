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
    </div>
  );
}
