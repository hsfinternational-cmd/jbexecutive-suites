import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { BookingSearch } from "@/components/booking-search";
import { RoomCard } from "@/components/room-card";
import { checkAvailability } from "@/lib/booking/rules";
import { formatUGX } from "@/lib/data";

export default async function AvailabilityPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const checkIn = params.checkIn || "2026-06-20";
  const checkOut = params.checkOut || "2026-06-22";
  const adults = Number(params.guests || params.adults || 2);
  const children = Number(params.children || 0);
  const results = checkAvailability({ checkIn, checkOut, adults, children, roomTypeId: params.roomTypeId || undefined });
  return (
    <PageShell>
      <section className="container-shell py-12">
        <h1 className="text-5xl text-[var(--brand-green)]">Availability</h1>
        <p className="mt-4 text-[var(--brand-muted)]">
          Showing room options for {checkIn} to {checkOut}. Availability should still be confirmed by the reservations team before payment.
        </p>
        <div className="mt-8"><BookingSearch compact /></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {results.map((result) => (
            <div key={result.roomType.id}>
              <RoomCard roomType={result.roomType} availableRooms={result.availableRooms} />
              <div className="rounded-b-[var(--radius-card)] bg-white px-5 pb-5">
                <p className="text-sm text-[var(--brand-muted)]">
                  Estimated total: {formatUGX(result.quote.total)} for {result.quote.nights} nights.
                </p>
                <Link href={`/book?roomTypeId=${result.roomType.id}&checkIn=${checkIn}&checkOut=${checkOut}`} className="mt-3 inline-flex rounded-full bg-[var(--brand-green)] px-4 py-2 text-sm font-semibold text-white">
                  Send inquiry
                </Link>
              </div>
            </div>
          ))}
        </div>
        {results.length === 0 ? <p className="mt-10 rounded-[var(--radius-card)] bg-white p-6">No matching rooms are available. Try different dates or contact the team directly on WhatsApp.</p> : null}
      </section>
    </PageShell>
  );
}
