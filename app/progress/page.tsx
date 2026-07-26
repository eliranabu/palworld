"use client";

import { useRef } from "react";
import Link from "next/link";
import { Download, Upload, RotateCcw, Star, CheckCircle2 } from "lucide-react";
import { legendaryPals, hugeDragonEggZones, items } from "@/lib/data";
import { useProgressStore } from "@/store/progress";
import { useHasMounted } from "@/lib/use-has-mounted";

const LOCATION_ENTRIES = [
  ...legendaryPals.map((pal) => ({ id: `pal-${pal.id}`, title: pal.name, href: `/locations/pals/${pal.id}` })),
  ...hugeDragonEggZones.map((zone) => ({ id: `egg-${zone.id}`, title: zone.name, href: `/locations/eggs/${zone.id}` })),
];

const ITEM_ENTRIES = items.map((item) => ({
  id: `item-${item.id}`,
  title: item.nameHe,
  href: `/items#${item.id}`,
}));

const ALL_ENTRIES = [...LOCATION_ENTRIES, ...ITEM_ENTRIES];

export default function ProgressPage() {
  const mounted = useHasMounted();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const visited = useProgressStore((s) => s.visited);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const notes = useProgressStore((s) => s.notes);
  const resetAll = useProgressStore((s) => s.resetAll);
  const importState = useProgressStore((s) => s.importState);

  const visitedCount = mounted ? Object.values(visited).filter(Boolean).length : 0;
  const bookmarkedEntries = mounted
    ? ALL_ENTRIES.filter((e) => bookmarks[e.id])
    : [];
  const noteEntries = mounted
    ? ALL_ENTRIES.filter((e) => notes[e.id]?.trim())
    : [];
  const completion = LOCATION_ENTRIES.length
    ? Math.round((visitedCount / LOCATION_ENTRIES.length) * 100)
    : 0;

  function handleExport() {
    const data = { visited, bookmarks, notes };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palworld-hunter-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        importState(parsed);
      } catch {
        alert("קובץ לא תקין — ודאו שזהו קובץ גיבוי שיוצא מהאתר הזה.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    if (confirm("לאפס את כל ההתקדמות, המועדפים וההערות? פעולה זו אינה הפיכה.")) {
      resetAll();
    }
  }

  return (
    <div dir="rtl" lang="he" className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <header className="mb-10">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-zinc-50">ההתקדמות שלי</h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          כל הנתונים כאן נשמרים אך ורק בדפדפן שלכם (localStorage) — אין שרת, אין חשבון, ואין שיתוף
          בין מכשירים. אפשר לגבות ולשחזר עם קובץ JSON.
        </p>
      </header>

      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">התקדמות מיקומים</h2>
          <span className="text-sm text-zinc-400">
            {visitedCount} / {LOCATION_ENTRIES.length} ({completion}%)
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/10"
        >
          <Download className="size-4" /> ייצוא גיבוי JSON
        </button>
        <button
          type="button"
          onClick={handleImportClick}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/10"
        >
          <Upload className="size-4" /> ייבוא גיבוי
        </button>
        <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileChange} className="hidden" />
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-2.5 text-sm text-red-300 hover:bg-red-400/10"
        >
          <RotateCcw className="size-4" /> איפוס הכל
        </button>
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <Star className="size-5 text-amber-400" aria-hidden="true" />
          <h2 className="text-xl font-bold text-zinc-50">מועדפים</h2>
          <span className="text-sm text-zinc-500">({bookmarkedEntries.length})</span>
        </div>
        {bookmarkedEntries.length === 0 ? (
          <p className="text-sm text-zinc-500">עדיין לא סימנתם מועדפים.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {bookmarkedEntries.map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300 hover:border-amber-400/30 hover:text-amber-300"
              >
                {entry.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="size-5 text-emerald-400" aria-hidden="true" />
          <h2 className="text-xl font-bold text-zinc-50">מיקומים שבוקרו</h2>
          <span className="text-sm text-zinc-500">({visitedCount})</span>
        </div>
        {visitedCount === 0 ? (
          <p className="text-sm text-zinc-500">עדיין לא סימנתם מיקומים כמבוקרים.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {LOCATION_ENTRIES.filter((e) => visited[e.id]).map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-sm text-emerald-300 hover:border-emerald-400/40"
              >
                {entry.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-zinc-50">הערות אישיות ({noteEntries.length})</h2>
        {noteEntries.length === 0 ? (
          <p className="text-sm text-zinc-500">עדיין אין הערות שמורות.</p>
        ) : (
          <div className="space-y-3">
            {noteEntries.map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20"
              >
                <p className="mb-1 text-sm font-medium text-zinc-200">{entry.title}</p>
                <p className="text-sm text-zinc-400">{notes[entry.id]}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
