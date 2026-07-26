"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "סגור תפריט" : "פתח תפריט"}
        aria-expanded={open}
        className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>

      {open && (
        <nav
          dir="rtl"
          className="absolute inset-x-0 top-16 border-b border-white/10 bg-background/95 px-6 py-4 backdrop-blur-md"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-amber-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
