"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, Clock } from "lucide-react";
import { buildSearchIndex, type SearchDoc } from "@/lib/search";

const RECENT_KEY = "palworld-hunter:recent-searches";
const MAX_RECENT = 5;

function loadRecent(): SearchDoc[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as SearchDoc[]) : [];
  } catch {
    return [];
  }
}

function saveRecent(doc: SearchDoc) {
  const current = loadRecent().filter((d) => d.id !== doc.id);
  const next = [doc, ...current].slice(0, MAX_RECENT);
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<SearchDoc[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => {
    const index = buildSearchIndex();
    return new Fuse(index, {
      keys: ["title", "subtitle", "category", "keywords"],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query, { limit: 8 }).map((r) => r.item);
  }, [fuse, query]);

  const visible = query.trim() ? results : recent;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const select = useCallback(
    (doc: SearchDoc) => {
      saveRecent(doc);
      close();
      router.push(doc.href);
    },
    [close, router],
  );

  const openPalette = useCallback(() => {
    setRecent(loadRecent());
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((current) => {
          if (!current) setRecent(loadRecent());
          return !current;
        });
      } else if (e.key === "Escape" && open) {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, visible.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && visible[activeIndex]) {
      select(visible[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">חיפוש</span>
        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-zinc-500 sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
          onClick={close}
        >
          <div
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f16] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="חפשו פריטים, פאלים אגדיים, אזורי ביצים…"
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={close}
                className="text-zinc-500 hover:text-zinc-300"
                aria-label="סגור חיפוש"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {!query.trim() && recent.length > 0 && (
                <p className="px-3 pb-1 pt-2 text-xs font-medium text-zinc-500">חיפושים אחרונים</p>
              )}
              {visible.length === 0 && query.trim() && (
                <p className="px-3 py-8 text-center text-sm text-zinc-500">אין תוצאות</p>
              )}
              {visible.map((doc, i) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => select(doc)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-right transition-colors ${
                    i === activeIndex ? "bg-amber-400/10" : "hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {!query.trim() && <Clock className="size-3.5 text-zinc-600" aria-hidden="true" />}
                    <span className="text-sm font-medium text-zinc-100">{doc.title}</span>
                    <span dir="ltr" className="text-xs text-zinc-500">
                      {doc.subtitle}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-500">
                    {doc.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
