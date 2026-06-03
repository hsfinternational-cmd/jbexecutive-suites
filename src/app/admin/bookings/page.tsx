import Link from "next/link";
import { sampleBookings } from "@/lib/data";

export default function AdminBookingsPage() {
  return (
    <section>
      <h1 className="text-4xl font-semibold">Bookings</h1>
      <input placeholder="Search by guest, phone, email, reference, room, or date" className="mt-6 h-11 w-full rounded-md border border-[var(--line)] px-3" />
      <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-sm">
        {sampleBookings.map((booking) => (
          <Link key={booking.id} href={`/admin/bookings/${booking.id}`} className="grid gap-3 border-b border-[var(--line)] p-4 text-sm md:grid-cols-5">
            <span className="font-mono">{booking.reference}</span><span>{booking.guest.fullName}</span><span>{booking.checkIn} to {booking.checkOut}</span><span>{booking.status}</span><span>${booking.totalAmount}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
