import { BookingInquiryForm } from "@/components/booking-inquiry-form";
import { PageShell } from "@/components/page-shell";

export default function ManageBookingPage() {
  return (
    <PageShell>
      <section className="container-shell py-14">
        <h1 className="text-5xl text-[var(--brand-green)]">Booking inquiry</h1>
        <p className="mt-4 max-w-2xl text-[var(--brand-muted)]">
          The current guest flow is handled directly with the reservations team. Share your dates and room preference below and we will continue the conversation on WhatsApp.
        </p>
        <div className="mt-8 max-w-3xl">
          <BookingInquiryForm />
        </div>
      </section>
    </PageShell>
  );
}
