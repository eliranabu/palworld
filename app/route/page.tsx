import type { Metadata } from "next";
import { RouteHelper } from "@/components/route/RouteHelper";
import { legendaryPals, hugeDragonEggZones } from "@/lib/data";
import type { RoutePoint } from "@/lib/route";

export const metadata: Metadata = {
  title: "מתכנן מסלול | Palworld Hunter",
  description: "בחרו יעדים וקבלו סדר ביקור מוצע לפי מרחק קו-ישר בין הקואורדינטות.",
};

export default function RoutePage() {
  const points: RoutePoint[] = [
    ...legendaryPals.map((pal) => ({ id: `pal-${pal.id}`, title: pal.name, coords: pal.coords })),
    ...hugeDragonEggZones.map((zone) => ({
      id: `egg-${zone.id}`,
      title: zone.name,
      coords: zone.anchorCoords,
    })),
  ];

  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
      <header className="mb-10">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-zinc-50">מתכנן מסלול</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          בחרו כמה יעדים (פאלים אגדיים ואזורי ביצי דרקון) ונציע סדר ביקור לפי מרחק קו-ישר בין
          הקואורדינטות שלהם — לא מסלול ניווט אמיתי במשחק, לא לוקח בחשבון הרים, מים, או מהירות
          הרכיבה שלכם. זהו כלי עזר גס לתכנון, לא ניווט מדויק.
        </p>
      </header>
      <RouteHelper points={points} />
    </div>
  );
}
