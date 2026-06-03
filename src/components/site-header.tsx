import Link from "next/link";
import { CalendarCheck, Menu } from "lucide-react";

const nav = [
  ["Rooms", "/rooms"],
  ["Facilities", "/facilities"],
  ["Location", "/location"],
  ["Policies", "/policies"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(247,244,239,0.92)] backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-wide text-[var(--brand-strong)]">
          JB Executive Suites
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[var(--brand-strong)]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/availability"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--brand)] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-strong)]"
          >
            <CalendarCheck size={16} /> Check availability
          </Link>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--line)] md:hidden" aria-label="Open navigation">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
