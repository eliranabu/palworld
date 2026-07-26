"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import {
  getPersonalImage,
  setPersonalImage,
  removePersonalImage,
  fileToResizedDataUrl,
} from "@/lib/personal-image-db";

export function PersonalImage({ id, alt }: { id: string; alt: string }) {
  const [dataUrl, setDataUrl] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    getPersonalImage(id)
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setLoaded(true);
        }
      })
      .catch(() => setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleFile(file: File) {
    const resized = await fileToResizedDataUrl(file);
    await setPersonalImage(id, resized);
    setDataUrl(resized);
  }

  async function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    await removePersonalImage(id);
    setDataUrl(undefined);
  }

  if (!loaded) {
    return <div className="aspect-square w-full animate-pulse rounded-xl bg-white/5" />;
  }

  if (dataUrl) {
    return (
      <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUrl} alt={alt} className="size-full object-cover" />
        <button
          type="button"
          onClick={handleRemove}
          aria-label="הסר תמונה אישית"
          className="absolute left-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 bg-white/5 text-zinc-500 transition-colors hover:border-amber-400/40 hover:text-amber-300"
    >
      <Camera className="size-5" aria-hidden="true" />
      <span className="px-2 text-center text-[11px] leading-tight">
        הוסף תמונה אישית
        <br />
        <span className="opacity-70">נשמר רק במכשיר שלך</span>
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </button>
  );
}
