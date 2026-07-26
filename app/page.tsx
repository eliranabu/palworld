import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-400/80">
        Palworld Companion
      </p>
      <h1 className="mb-4 max-w-2xl text-4xl font-extrabold tracking-tight text-zinc-50 sm:text-5xl">
        Palworld Hunter
      </h1>
      <p className="mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
        Legendary Pal spawns, Huge Dragon Egg hotspots, and a fully Hebrew-translated item
        database — sourced and cited, not guessed.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/items"
          className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
        >
          מאגר הפריטים (עברית)
        </Link>
      </div>
      <p className="mt-6 text-xs text-zinc-600">
        Interactive map, search, and progress tracking are still in active development.
      </p>
    </main>
  );
}
