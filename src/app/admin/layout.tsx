import Link from "next/link";
import type { ReactNode } from "react";

const adminNav = [
  ["Dashboard", "/admin"],
  ["Bookings", "/admin/bookings"],
  ["Calendar", "/admin/calendar"],
  ["Rooms", "/admin/rooms"],
  ["Room types", "/admin/room-types"],
  ["Rates", "/admin/rates"],
  ["Content", "/admin/content"],
  ["Gallery", "/admin/gallery"],
  ["Policies", "/admin/policies"],
  ["AI chats", "/admin/ai-conversations"],
  ["Settings", "/admin/settings"],
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--line)] bg-white p-5 lg:block">
        <Link href="/" className="font-semibold text-[var(--brand)]">JB Executive Suites</Link>
        <nav className="mt-8 grid gap-1 text-sm">
          {adminNav.map(([label, href]) => <Link key={href} href={href} className="rounded-md px-3 py-2 text-[var(--muted)] hover:bg-[#f1ede5] hover:text-black">{label}</Link>)}
        </nav>
      </aside>
      <main className="lg:pl-64">
        <div className="border-b border-[var(--line)] bg-white px-6 py-4">
          <p className="text-sm text-[var(--muted)]">Protected admin dashboard</p>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
