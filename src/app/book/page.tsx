import { BookingInquiryForm } from "@/components/booking-inquiry-form";
import { PageShell } from "@/components/page-shell";
import { formatUGX, property, roomTypes } from "@/lib/data";

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const selected = roomTypes.find((roomType) => roomType.id === params.roomTypeId) ?? roomTypes[0];
  return (
    <PageShell>
      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Booking inquiry</p>
          <h1 className="mt-3 text-5xl text-[var(--brand-green)]">Tell us your dates and preferred room option.</h1>
          <p className="mt-4 max-w-2xl text-[var(--brand-muted)]">
            We will help you confirm availability quickly. For the first implementation, the form prepares a structured WhatsApp message instead of pretending the booking is already confirmed.
          </p>
          <div className="mt-8">
            <BookingInquiryForm initialRoomTypeId={selected.id} initialCheckIn={params.checkIn} initialCheckOut={params.checkOut} />
          </div>
        </div>
        <aside className="h-fit rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--brand-muted)]">Selected room</p>
          <h2 className="mt-2 text-3xl text-[var(--brand-green)]">{selected.name}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{selected.description}</p>
          <p className="mt-4 text-3xl font-bold text-[var(--brand-charcoal)]">{formatUGX(selected.promotionalRate ?? selected.baseNightlyRate)}</p>
          <p className="mt-3 text-sm text-[var(--brand-muted)]">{property.tagline}</p>
        </aside>
      </section>
    </PageShell>
  );
}
