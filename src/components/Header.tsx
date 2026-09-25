// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/8 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link
          href="/"
          className="font-display text-lg font-extrabold tracking-tight text-charcoal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 rounded-lg"
          onClick={() => setOpen(false)}
        >
          Wetin I Go <span className="text-tomato">Chop?</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-charcoal/70 md:flex">
          <a href="/#how" className="transition hover:text-tomato">
            How it works
          </a>
          <a href="/#about" className="transition hover:text-tomato">
            About
          </a>
          <Link
            href="/recommend"
            className="rounded-full bg-tomato px-5 py-2.5 text-white shadow-soft transition hover:bg-tomato-dark"
          >
            What should I eat?
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition hover:bg-charcoal/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 md:hidden"
        >
          <span aria-hidden="true" className="text-xl">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-charcoal/8 bg-cream px-5 pb-5 pt-2 md:hidden">
          <a
            href="/#how"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-charcoal/80 transition hover:bg-charcoal/5"
          >
            How it works
          </a>
          <a
            href="/#about"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-charcoal/80 transition hover:bg-charcoal/5"
          >
            About
          </a>
          <Link
            href="/recommend"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-tomato px-5 py-3.5 text-center font-semibold text-white"
          >
            What should I eat?
          </Link>
        </nav>
      )}
    </header>
  );
}
