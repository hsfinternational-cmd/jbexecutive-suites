import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { BookingSearch } from "@/components/booking-search";
import { ImageSlideshow } from "@/components/image-slideshow";
import { formatUGX, property, roomTypes } from "@/lib/data";

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
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <ImageSlideshow images={roomType.images} altFallback={roomType.name} priority />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Room details</p>
            <h1 className="mt-3 text-5xl text-[var(--brand-green)]">{roomType.name}</h1>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">{roomType.description}</p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-[var(--radius-card)] bg-white p-4 shadow-[var(--shadow-soft)]"><dt className="text-[var(--brand-muted)]">Nightly rate</dt><dd className="font-semibold">{formatUGX(roomType.promotionalRate ?? roomType.baseNightlyRate)}</dd></div>
              <div className="rounded-[var(--radius-card)] bg-white p-4 shadow-[var(--shadow-soft)]"><dt className="text-[var(--brand-muted)]">Booking note</dt><dd className="font-semibold">Confirm availability first</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {roomType.amenities.map((amenity) => <span key={amenity} className="rounded-full bg-white px-3 py-1 text-sm shadow-[var(--shadow-soft)]">{amenity}</span>)}
            </div>
            <p className="mt-6 text-sm text-[var(--brand-muted)]">{roomType.cancellationPolicy}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/book?roomTypeId=${roomType.id}`} className="inline-flex rounded-full bg-[var(--brand-green)] px-5 py-3 font-semibold text-white">Check availability</Link>
              <Link
                href={`${property.whatsappUrl}?text=${encodeURIComponent(`Hello JB Executive Suites. I would like to ask about the ${roomType.name}. Please confirm availability.`)}`}
                className="inline-flex rounded-full border border-[var(--brand-border)] px-5 py-3 font-semibold text-[var(--brand-charcoal)]"
              >
                Ask on WhatsApp
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <BookingSearch compact />
        </div>
      </section>
    </PageShell>
  );
}
