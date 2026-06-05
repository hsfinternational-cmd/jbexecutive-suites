"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalendarCheck, Menu, MessageCircleMore, X } from "lucide-react";
import { property } from "@/lib/data";

const nav = [
  ["Rooms", "/rooms"],
  ["Amenities", "/facilities"],
  ["Gallery", "/gallery"],
  ["Location", "/location"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-border)] bg-white/92 backdrop-blur">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/brand/jb-monogram.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-xl" />
          <span className="sr-only">{property.name}</span>
          <div className="hidden sm:block">
            <p className="font-serif text-xl text-[var(--brand-green)]">{property.name}</p>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--brand-orange)]">{property.tagline}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--brand-muted)] lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[var(--brand-green)]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href={property.whatsappUrl}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-cream)] px-4 text-sm font-semibold text-[var(--brand-charcoal)]"
          >
            <MessageCircleMore size={16} />
            Book on WhatsApp
          </Link>
          <Link
            href="/book"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--brand-green)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
          >
            <CalendarCheck size={16} />
            Check Availability
          </Link>
        </div>
        <button
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-border)] text-[var(--brand-charcoal)] lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[var(--brand-border)] bg-white lg:hidden">
          <div className="container-shell grid gap-2 py-4">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--brand-charcoal)]">
                {label}
              </Link>
            ))}
            <Link href={property.whatsappUrl} className="rounded-2xl bg-[var(--brand-green)] px-4 py-3 text-sm font-semibold text-white">
              Book on WhatsApp
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
