import Link from "next/link";
import { BookingInquiryForm } from "@/components/booking-inquiry-form";
import { PageShell } from "@/components/page-shell";
import { paymentOptions, property, toCallHref } from "@/lib/data";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="container-shell grid gap-8 py-14 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl text-[var(--brand-green)]">Contact JB Executive Suites</h1>
          <p className="mt-5 text-[var(--brand-muted)]">{property.address}</p>
          <div className="mt-6 grid gap-3">
            {property.phoneNumbers.map((phone) => (
              <Link key={phone} href={toCallHref(phone)} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-charcoal)] shadow-[var(--shadow-soft)]">
                {phone}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={property.whatsappUrl} className="inline-flex rounded-full bg-[var(--brand-green)] px-5 py-3 font-semibold text-white">WhatsApp booking</Link>
            <Link href={property.googleDirectionsUrl} className="inline-flex rounded-full border border-[var(--brand-border)] px-5 py-3 font-semibold text-[var(--brand-charcoal)]">Directions</Link>
          </div>
          <div className="mt-8 rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-orange)]">Payment options</p>
            <div className="mt-4 grid gap-2 text-sm text-[var(--brand-muted)] sm:grid-cols-2">
              {paymentOptions.map((option) => <p key={option}>{option}</p>)}
            </div>
          </div>
        </div>
        <BookingInquiryForm />
      </section>
    </PageShell>
  );
}
