"use client";

import { useProgressStore } from "@/store/progress";
import { useHasMounted } from "@/lib/use-has-mounted";

export function PersonalNote({ id }: { id: string }) {
  const mounted = useHasMounted();
  const note = useProgressStore((s) => s.notes[id] ?? "");
  const setNote = useProgressStore((s) => s.setNote);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-2 text-sm font-semibold text-zinc-300">הפתק האישי שלי</h2>
      <textarea
        value={mounted ? note : ""}
        onChange={(e) => setNote(id, e.target.value)}
        placeholder="רשמו כאן הערות אישיות — נשמר רק אצלכם בדפדפן."
        rows={3}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/40 focus:outline-none"
      />
    </div>
  );
}
