import Link from "next/link";
import { Compass } from "lucide-react";
import { SearchPalette } from "@/components/search/SearchPalette";
import { MobileNav } from "@/components/layout/MobileNav";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "מיקומים" },
  { href: "/items", label: "פריטים" },
  { href: "/map", label: "מפה" },
  { href: "/route", label: "מסלול" },
  { href: "/progress", label: "ההתקדמות שלי" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2 text-zinc-50">
          <Compass className="size-5 text-amber-400" aria-hidden="true" />
          <span className="text-sm font-bold tracking-tight">Palworld Hunter</span>
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-6 lg:flex">
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
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
