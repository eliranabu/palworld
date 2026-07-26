import type { Metadata } from "next";
import Link from "next/link";
import { CircleDot, Crosshair, Swords, Shield, Gem, Utensils, type LucideIcon } from "lucide-react";
import { ammo, armor, materials, spheres } from "@/lib/data";
import type { Item, ItemCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "מאגר פריטים | Palworld Hunter",
  description: "כל פריטי המשחק Palworld מתורגמים לעברית, עם מקורות ותאריך אימות.",
};

const CATEGORY_LABELS: Record<string, string> = {
  sphere: "כדורי תפיסה",
  ammo: "תחמושת",
  weapon: "נשקים",
  armor: "שריון",
  material: "חומרים",
  consumable: "מתכלים",
};

const CATEGORY_ICONS: Record<ItemCategory, LucideIcon> = {
  sphere: CircleDot,
  ammo: Crosshair,
  weapon: Swords,
  armor: Shield,
  material: Gem,
  consumable: Utensils,
};

function ItemCard({ item }: { item: Item }) {
  const Icon = CATEGORY_ICONS[item.category];
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]">
      <header className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
          <Icon className="size-4 shrink-0 text-amber-400/70" aria-hidden="true" />
          {item.nameHe}
        </h3>
        {item.tier !== undefined && (
          <span className="shrink-0 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
            דרגה {item.tier}
          </span>
        )}
      </header>
      <p dir="ltr" className="mb-3 text-left text-xs text-zinc-500">
        {item.nameEn}
      </p>
      <p className="mb-3 text-sm leading-relaxed text-zinc-300">{item.descriptionHe}</p>
      <p className="mb-4 text-sm leading-relaxed text-zinc-400">
        <span className="font-medium text-zinc-300">איך משיגים: </span>
        {item.howToObtainHe}
      </p>
      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-zinc-500">
        <span>גרסה מאומתת: {item.lastVerifiedVersion}</span>
        <span className="flex flex-wrap gap-2">
          {item.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-amber-300"
            >
              מקור
            </a>
          ))}
        </span>
      </footer>
    </article>
  );
}

function ItemSection({
  id,
  title,
  icon: Icon,
  items: sectionItems,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  items: Item[];
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-24">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="size-6 text-amber-400" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-zinc-50">{title}</h2>
        <span className="text-sm text-zinc-500">{sectionItems.length} פריטים</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectionItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

const PENDING_CATEGORIES = [
  { label: "נשקים", count: "כ-25+" },
  { label: "שריון — שאר הווריאציות (נדירות, עמידות-חום/קור)", count: "70+" },
  { label: "חומרים — עץ, אבן, מוצרי פאל, אבנים יקרות", count: "כ-140" },
  { label: "מתכלים ומזון", count: "295" },
  { label: "מבנים", count: "טרם נסקר" },
  { label: "פריטי מפתח", count: "טרם נסקר" },
];

export default function ItemsPage() {
  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <Link href="/" className="mb-8 inline-block text-sm text-zinc-400 hover:text-amber-300">
        ← חזרה לדף הבית
      </Link>

      <header className="mb-12">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-zinc-50">
          מאגר פריטים
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          כל פריט כאן מתורגם בקפידה לעברית תקינה, לצד השם המקורי באנגלית. ל-Palworld אין לוקליזציה
          רשמית לעברית — זהו תרגום קהילתי, לא תרגום רשמי של המשחק. כל פריט כולל קישור למקור שממנו
          נלקח המידע ואת גרסת המשחק שבה אומת לאחרונה.
        </p>
      </header>

      <ItemSection id="spheres" title={CATEGORY_LABELS.sphere} icon={CATEGORY_ICONS.sphere} items={spheres} />
      <ItemSection id="ammo" title={CATEGORY_LABELS.ammo} icon={CATEGORY_ICONS.ammo} items={ammo} />
      <ItemSection id="armor" title={CATEGORY_LABELS.armor} icon={CATEGORY_ICONS.armor} items={armor} />
      <ItemSection id="materials" title={CATEGORY_LABELS.material} icon={CATEGORY_ICONS.material} items={materials} />

      <section className="mb-14 rounded-2xl border border-dashed border-white/15 p-6">
        <h2 className="mb-2 text-lg font-semibold text-zinc-200">כיסוי חלקי בשלב זה</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          &quot;שריון&quot; כאן מכסה את 8 סטי השריון הבסיסיים ו-6 סוגי המגנים (14 פריטים) — לא את כל 90+
          הווריאציות לפי נדירות ועמידות-חום/קור. &quot;חומרים&quot; מכסה עפרות ומטילים (17 פריטים) מתוך
          כ-156 חומרים במשחק (כולל עץ, אבן, מוצרי פאל ואבנים יקרות שטרם נוספו).
        </p>
      </section>

      <section className="rounded-2xl border border-dashed border-white/15 p-6">
        <h2 className="mb-2 text-xl font-bold text-zinc-50">קטגוריות בהמתנה</h2>
        <p className="mb-4 text-sm leading-relaxed text-zinc-400">
          זהו השלב השני של מאגר הפריטים. הקטגוריות הבאות עדיין לא תורגמו ויתווספו בהמשך:
        </p>
        <ul className="grid grid-cols-2 gap-2 text-sm text-zinc-300 sm:grid-cols-3">
          {PENDING_CATEGORIES.map((category) => (
            <li key={category.label} className="rounded-lg bg-white/5 px-3 py-2">
              {category.label}
              <span className="mr-1 text-zinc-500"> ({category.count})</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
