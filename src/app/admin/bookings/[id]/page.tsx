import { notFound } from "next/navigation";
import { sampleBookings } from "@/lib/data";

export default async function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = sampleBookings.find((candidate) => candidate.id === id);
  if (!booking) notFound();
  return (
    <section>
      <h1 className="text-4xl font-semibold">{booking.reference}</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Guest</h2>
          <p className="mt-3">{booking.guest.fullName}</p><p>{booking.guest.email}</p><p>{booking.guest.phone}</p><p>{booking.guest.country}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Status controls</h2>
          <select defaultValue={booking.status} className="mt-4 h-11 w-full rounded-md border border-[var(--line)] px-3">
            {["pending", "held", "awaiting_payment", "confirmed", "checked_in", "checked_out", "cancelled", "no_show"].map((status) => <option key={status}>{status}</option>)}
          </select>
          <button className="mt-4 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white">Update status</button>
        </div>
      </div>
    </section>
  );
}
