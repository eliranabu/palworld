import Link from "next/link";
import { Compass } from "lucide-react";
import { SearchPalette } from "@/components/search/SearchPalette";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "מיקומים" },
  { href: "/items", label: "פריטים" },
  { href: "/map", label: "מפה" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2 text-zinc-50">
          <Compass className="size-5 text-amber-400" aria-hidden="true" />
          <span className="text-sm font-bold tracking-tight">Palworld Hunter</span>
        </Link>
        <div className="flex items-center gap-5">
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-amber-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <SearchPalette />
        </div>
      </div>
    </header>
  );
}
