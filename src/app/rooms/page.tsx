import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { RoomCard } from "@/components/room-card";
import { BookingSearch } from "@/components/booking-search";
import { property, roomTypes } from "@/lib/data";

export const metadata: Metadata = { title: "Rooms", description: "Browse the current room options and rates at JB Executive Suites." };

export default function RoomsPage() {
  return (
    <PageShell>
      <section className="container-shell py-12">
        <h1 className="text-5xl text-[var(--brand-green)] md:text-6xl">Room options</h1>
        <p className="mt-4 max-w-2xl text-[var(--brand-muted)]">
          Choose the room option that fits your stay and budget. Availability should always be confirmed by the {property.name} team before payment.
        </p>
        <div className="mt-8">
          <BookingSearch compact />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {roomTypes.map((roomType) => <RoomCard key={roomType.id} roomType={roomType} />)}
        </div>
      </section>
    </PageShell>
  );
}
