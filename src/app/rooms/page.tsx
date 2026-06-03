import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { RoomCard } from "@/components/room-card";
import { BookingSearch } from "@/components/booking-search";
import { roomTypes } from "@/lib/data";

export const metadata: Metadata = { title: "Rooms", description: "Browse room types at JB Executive Suites." };

export default function RoomsPage() {
  return (
    <PageShell>
      <section className="container-shell py-12">
        <h1 className="text-5xl font-semibold">Rooms and suites</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">Room types are configurable in the database and backed by individual physical-room inventory.</p>
        <div className="mt-8"><BookingSearch compact /></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {roomTypes.map((roomType) => <RoomCard key={roomType.id} roomType={roomType} />)}
        </div>
      </section>
    </PageShell>
  );
}
