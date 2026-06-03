import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { property } from "@/lib/data";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="container-shell grid gap-8 py-14 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-semibold">Contact</h1>
          <p className="mt-5 text-[var(--muted)]">{property.phone}</p>
          <p className="text-[var(--muted)]">{property.email}</p>
          <Link href={`https://wa.me/${property.whatsapp.replace(/\D/g, "")}`} className="mt-6 inline-flex rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Open WhatsApp</Link>
        </div>
        <form className="rounded-lg bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <input aria-label="Name" placeholder="Name" className="h-11 rounded-md border border-[var(--line)] px-3" />
            <input aria-label="Email" type="email" placeholder="Email" className="h-11 rounded-md border border-[var(--line)] px-3" />
            <input aria-label="Phone" placeholder="Phone" className="h-11 rounded-md border border-[var(--line)] px-3" />
            <textarea aria-label="Message" placeholder="Message" rows={5} className="rounded-md border border-[var(--line)] px-3 py-2" />
            <button className="rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Send request</button>
          </div>
        </form>
      </section>
    </PageShell>
  );
}
