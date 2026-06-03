import { PageShell } from "@/components/page-shell";
import { roomTypes } from "@/lib/data";

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const selected = roomTypes.find((roomType) => roomType.id === params.roomTypeId) ?? roomTypes[0];
  return (
    <PageShell>
      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
        <form action="/api/booking" method="post" className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-4xl font-semibold">Complete your booking</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input type="hidden" name="roomTypeId" value={selected.id} />
            <label className="text-sm font-semibold">Check-in<input required name="checkIn" type="date" defaultValue={params.checkIn} className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Check-out<input required name="checkOut" type="date" defaultValue={params.checkOut} className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Adults<input required name="adults" type="number" min="1" defaultValue={params.adults || 2} className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Children<input name="children" type="number" min="0" defaultValue={params.children || 0} className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Full name<input required name="fullName" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Email<input required name="email" type="email" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Phone<input required name="phone" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Country<input required name="country" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Arrival time<input name="arrivalTime" type="time" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
            <label className="text-sm font-semibold">Payment method<select name="paymentMethod" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3"><option value="pay_on_arrival">Pay on arrival</option><option value="card">Card</option><option value="mobile_money">Mobile money</option><option value="bank_transfer">Bank transfer</option></select></label>
            <label className="text-sm font-semibold sm:col-span-2">Special requests<textarea name="specialRequests" rows={4} className="mt-2 w-full rounded-md border border-[var(--line)] px-3 py-2" /></label>
          </div>
          <button className="mt-6 rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Create booking</button>
        </form>
        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm uppercase text-[var(--muted)]">Selected room</p>
          <h2 className="mt-2 text-2xl font-semibold">{selected.name}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{selected.description}</p>
          <p className="mt-4 text-3xl font-bold text-[var(--brand)]">${selected.promotionalRate ?? selected.baseNightlyRate}</p>
        </aside>
      </section>
    </PageShell>
  );
}
