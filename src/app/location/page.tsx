import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { property } from "@/lib/data";

export default function LocationPage() {
  return (
    <PageShell>
      <section className="container-shell grid gap-8 py-14 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-semibold">Location</h1>
          <p className="mt-5 flex items-center gap-3 text-lg text-[var(--muted)]"><MapPin />{property.address}</p>
          <Link href={property.mapUrl} className="mt-6 inline-flex rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">Open map</Link>
        </div>
        <div className="grid min-h-[360px] place-items-center rounded-lg border border-[var(--line)] bg-white text-[var(--muted)]">Map placeholder configurable from admin settings</div>
      </section>
    </PageShell>
  );
}
