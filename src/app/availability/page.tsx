import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { BookingSearch } from "@/components/booking-search";
import { RoomCard } from "@/components/room-card";
import { checkAvailability } from "@/lib/booking/rules";

export default async function AvailabilityPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const checkIn = params.checkIn || "2026-06-20";
  const checkOut = params.checkOut || "2026-06-22";
  const adults = Number(params.adults || 2);
  const children = Number(params.children || 0);
  const results = checkAvailability({ checkIn, checkOut, adults, children, roomTypeId: params.roomTypeId || undefined });
  return (
    <PageShell>
      <section className="container-shell py-12">
        <h1 className="text-5xl font-semibold">Availability</h1>
        <p className="mt-4 text-[var(--muted)]">Showing rooms for {checkIn} to {checkOut}. Availability excludes conflicting bookings, unavailable physical rooms, and active holds.</p>
        <div className="mt-8"><BookingSearch compact /></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {results.map((result) => (
            <div key={result.roomType.id}>
              <RoomCard roomType={result.roomType} availableRooms={result.availableRooms} />
              <div className="rounded-b-lg bg-white px-5 pb-5">
                <p className="text-sm text-[var(--muted)]">{result.quote.nights} nights, taxes ${result.quote.taxes}, service ${result.quote.serviceFee}, total ${result.quote.total}</p>
                <Link href={`/book?roomTypeId=${result.roomType.id}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`} className="mt-3 inline-flex rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white">Book now</Link>
              </div>
            </div>
          ))}
        </div>
        {results.length === 0 ? <p className="mt-10 rounded-lg bg-white p-6">No matching rooms are available. Try different dates or fewer guests.</p> : null}
      </section>
    </PageShell>
  );
}
