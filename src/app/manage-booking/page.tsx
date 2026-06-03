import { PageShell } from "@/components/page-shell";

export default function ManageBookingPage() {
  return (
    <PageShell>
      <section className="container-shell py-14">
        <h1 className="text-5xl font-semibold">Manage booking</h1>
        <form className="mt-8 max-w-xl rounded-lg bg-white p-6 shadow-sm">
          <label className="text-sm font-semibold">Booking reference<input name="reference" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
          <label className="mt-4 block text-sm font-semibold">Email or phone<input name="emailOrPhone" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3" /></label>
          <button className="mt-6 rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Find booking</button>
        </form>
      </section>
    </PageShell>
  );
}
