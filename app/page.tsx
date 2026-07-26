import Link from "next/link";
import { Egg, MapPinned, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { items, legendaryPals, hugeDragonEggZones } from "@/lib/data";

const FEATURES = [
  {
    href: "/items",
    icon: Sparkles,
    title: "מאגר פריטים",
    titleEn: "Item Database",
    description: `${items.length} פריטים מתורגמים לעברית תקינה, עם מקורות מצוטטים.`,
    status: "live" as const,
  },
  {
    href: "/locations",
    icon: Egg,
    title: "ביצי דרקון ענקיות ופאלים אגדיים",
    titleEn: "Legendary Pals & Huge Dragon Eggs",
    description: `${legendaryPals.length} פאלים אגדיים ו-${hugeDragonEggZones.length} אזורי ביצים, עם קואורדינטות אמיתיות.`,
    status: "live" as const,
  },
  {
    href: "/map",
    icon: MapPinned,
    title: "מפה אינטראקטיבית",
    titleEn: "Interactive Map",
    description: "זום, סינון, ומיקומים על מפת ייחוס מעוצבת.",
    status: "live" as const,
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-24 text-center sm:py-32">
      <FadeIn>
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400/80">
          Palworld Companion
        </p>
        <h1 className="mb-4 max-w-2xl text-4xl font-extrabold tracking-tight text-zinc-50 sm:text-5xl">
          Palworld Hunter
        </h1>
        <p className="mb-14 max-w-xl text-lg leading-relaxed text-zinc-400">
          Legendary Pal spawns, Huge Dragon Egg hotspots, and a fully Hebrew-translated item
          database — sourced and cited, not guessed.
        </p>
      </FadeIn>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          const isLive = feature.status === "live";
          return (
            <FadeIn key={feature.title} delay={0.1 + i * 0.08}>
              <Link
                href={feature.href}
                aria-disabled={!isLive}
                className={`group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-right backdrop-blur-sm transition-all ${
                  isLive
                    ? "hover:border-amber-400/30 hover:bg-white/[0.07]"
                    : "pointer-events-none opacity-50"
                }`}
                dir="rtl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="size-6 text-amber-400" aria-hidden="true" />
                  {!isLive && (
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-zinc-400">
                      בקרוב
                    </span>
                  )}
                </div>
                <h2 className="mb-1 text-lg font-bold text-zinc-50">{feature.title}</h2>
                <p dir="ltr" className="mb-2 text-left text-xs text-zinc-500">
                  {feature.titleEn}
                </p>
                <p className="text-sm leading-relaxed text-zinc-400">{feature.description}</p>
              </Link>
            </FadeIn>
          );
        })}

        <FadeIn delay={0.1 + FEATURES.length * 0.08}>
          <div
            dir="rtl"
            className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-right backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <Sparkles className="size-6 text-amber-400" aria-hidden="true" />
              <kbd className="rounded border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-zinc-400">
                ⌘K
              </kbd>
            </div>
            <h2 className="mb-1 text-lg font-bold text-zinc-50">חיפוש מהיר</h2>
            <p dir="ltr" className="mb-2 text-left text-xs text-zinc-500">
              Instant Search
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              לחצו ⌘K (או Ctrl+K) בכל עמוד באתר לחיפוש מיידי בכל מאגר הנתונים.
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
