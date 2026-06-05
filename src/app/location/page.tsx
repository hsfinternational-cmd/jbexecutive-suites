import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { nearbyPlaces, property } from "@/lib/data";

export default function LocationPage() {
  return (
    <PageShell>
      <section className="container-shell grid gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-5xl text-[var(--brand-green)]">Location and directions</h1>
          <p className="mt-5 flex items-center gap-3 text-lg text-[var(--brand-muted)]"><MapPin />{property.address}</p>
          <p className="mt-4 text-sm text-[var(--brand-muted)]">
            Coordinates: {property.coordinates.latitude}, {property.coordinates.longitude}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={property.googleDirectionsUrl} className="inline-flex rounded-full bg-[var(--brand-green)] px-5 py-3 font-semibold text-white">Google Maps directions</Link>
            <Link href={property.googleMapUrl} className="inline-flex rounded-full border border-[var(--brand-border)] px-5 py-3 font-semibold text-[var(--brand-charcoal)]">Map search</Link>
          </div>
          <div className="mt-8 rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Nearby conveniences</p>
            <div className="mt-4 grid gap-3">
              {nearbyPlaces.map((place) => (
                <p key={place} className="rounded-2xl bg-[var(--brand-mist)] px-4 py-3 text-sm text-[var(--brand-charcoal)]">
                  {place}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)]">
            <Image src="/images/location/jb-suites-map-snippet.webp" alt="Map snippet showing JB Executive Suites near Shimoni Road, Mulawa." fill className="object-cover" sizes="50vw" />
          </div>
          <iframe
            title="JB Executive Suites map"
            src={`https://www.google.com/maps?q=${property.coordinates.latitude},${property.coordinates.longitude}&z=15&output=embed`}
            className="h-[320px] w-full rounded-[var(--radius-card)] border-0 shadow-[var(--shadow-soft)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </PageShell>
  );
}
