import { sampleBookings } from "@/lib/data";

export default function AdminCalendarPage() {
  return (
    <section>
      <h1 className="text-4xl font-semibold">Calendar</h1>
      <div className="mt-6 grid gap-3">
        {sampleBookings.map((booking) => <p key={booking.id} className="rounded-lg bg-white p-4 shadow-sm">{booking.checkIn} to {booking.checkOut}: {booking.reference} ({booking.status})</p>)}
      </div>
    </section>
  );
}
