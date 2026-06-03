import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { BookingSearch } from "@/components/booking-search";
import { roomTypes } from "@/lib/data";

export function generateStaticParams() {
  return roomTypes.map((roomType) => ({ slug: roomType.slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roomType = roomTypes.find((candidate) => candidate.slug === slug);
  if (!roomType) notFound();
  return (
    <PageShell>
      <section className="container-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={roomType.images[0].url} alt={roomType.images[0].alt} fill className="object-cover" sizes="60vw" priority />
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-[var(--accent)]">Room details</p>
            <h1 className="mt-3 text-5xl font-semibold">{roomType.name}</h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{roomType.description}</p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-white p-4"><dt className="text-[var(--muted)]">Guests</dt><dd className="font-semibold">{roomType.maxGuests}</dd></div>
              <div className="rounded-lg bg-white p-4"><dt className="text-[var(--muted)]">Bed</dt><dd className="font-semibold">{roomType.bedConfiguration}</dd></div>
              <div className="rounded-lg bg-white p-4"><dt className="text-[var(--muted)]">Size</dt><dd className="font-semibold">{roomType.roomSize}</dd></div>
              <div className="rounded-lg bg-white p-4"><dt className="text-[var(--muted)]">From</dt><dd className="font-semibold">${roomType.promotionalRate ?? roomType.baseNightlyRate}</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {roomType.amenities.map((amenity) => <span key={amenity} className="rounded-full bg-white px-3 py-1 text-sm">{amenity}</span>)}
            </div>
            <p className="mt-6 text-sm text-[var(--muted)]">{roomType.cancellationPolicy}</p>
            <Link href={`/availability?roomTypeId=${roomType.id}`} className="mt-6 inline-flex rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Check availability</Link>
          </div>
        </div>
        <div className="mt-10"><BookingSearch compact /></div>
      </section>
    </PageShell>
  );
}
