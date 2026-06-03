import Link from "next/link";
import { rooms, roomTypes, sampleBookings } from "@/lib/data";

export default function AdminPage() {
  const available = rooms.filter((room) => room.status === "available").length;
  return (
    <section>
      <h1 className="text-4xl font-semibold">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[["Bookings", sampleBookings.length], ["Room types", roomTypes.length], ["Physical rooms", rooms.length], ["Available now", available]].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white p-5 shadow-sm"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-3xl font-semibold">{value}</p></div>
        ))}
      </div>
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Next actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/bookings" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white">Review bookings</Link>
          <Link href="/admin/rooms" className="rounded-md border border-[var(--line)] px-4 py-2 text-sm font-semibold">Manage rooms</Link>
        </div>
      </div>
    </section>
  );
}
