import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { BookingSearch } from "@/components/booking-search";
import { PageShell } from "@/components/page-shell";
import { RoomCard } from "@/components/room-card";
import { facilities, policies, property, roomTypes } from "@/lib/data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: property.name,
    address: property.address,
    telephone: property.phone,
    email: property.email,
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative min-h-[680px] overflow-hidden bg-[#15251d] text-white">
        <Image src="/images/hero-suite.jpg" alt="Executive suite bedroom at JB Executive Suites" fill priority className="object-cover opacity-80" sizes="100vw" />
        <div className="image-wash absolute inset-0" />
        <div className="container-shell relative flex min-h-[680px] flex-col justify-end pb-10 pt-24">
          <div className="max-w-3xl pb-8">
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">Kampala serviced apartments</p>
            <h1 className="text-5xl font-semibold leading-tight md:text-7xl">{property.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">{property.description}</p>
          </div>
          <BookingSearch />
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {roomTypes.slice(0, 4).map((roomType) => (
            <div key={roomType.id} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={roomType.images[0].url} alt={roomType.images[0].alt} fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      </section>

      <section id="overview" className="container-shell grid gap-10 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--accent)]">Overview</p>
          <h2 className="mt-3 text-4xl font-semibold">Executive calm, practical service, and real room inventory.</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            JB Executive Suites is designed for guests who need a dependable base in Kampala. The booking engine models every physical room, supports temporary holds, and keeps payment adapters separate from inventory rules.
          </p>
        </div>
        <div className="grid gap-3">
          {["20 physical rooms", "Database-managed room types", "Backend availability checks", "Admin-controlled room status"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
              <CheckCircle2 className="text-[var(--brand)]" size={20} /> {item}
            </p>
          ))}
        </div>
      </section>

      <section id="rooms" className="container-shell py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--accent)]">Featured rooms</p>
            <h2 className="mt-3 text-4xl font-semibold">Choose the room shape that fits the stay.</h2>
          </div>
          <Link href="/rooms" className="hidden rounded-md border border-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand)] md:inline-flex">All rooms</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {roomTypes.slice(0, 3).map((roomType) => (
            <RoomCard key={roomType.id} roomType={roomType} />
          ))}
        </div>
      </section>

      <section id="facilities" className="bg-white py-16">
        <div className="container-shell grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Sparkles className="text-[var(--accent)]" />
            <h2 className="mt-4 text-3xl font-semibold">Facilities and amenities</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:col-span-2">
            {facilities.map((facility) => (
              <p key={facility} className="rounded-lg border border-[var(--line)] p-4">{facility}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-16 md:grid-cols-3">
        {[
          ["Why stay with us", "Quiet rooms, clear pricing, and helpful staff for short or extended stays.", ShieldCheck],
          ["Location", property.address, MapPin],
          ["Policies", policies[0].body, CheckCircle2],
        ].map(([title, body, Icon]) => (
          <div key={String(title)} className="rounded-lg bg-white p-6 shadow-sm">
            <Icon className="text-[var(--brand)]" />
            <h3 className="mt-4 text-xl font-semibold">{title as string}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body as string}</p>
          </div>
        ))}
      </section>

      <section className="container-shell rounded-lg bg-[var(--brand)] p-8 text-white md:p-12">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Need a quick quote or human help?</h2>
            <p className="mt-3 text-white/80">Use the assistant, call reservations, or open WhatsApp for direct support.</p>
          </div>
          <Link href={`https://wa.me/${property.whatsapp.replace(/\D/g, "")}`} className="rounded-md bg-white px-5 py-3 text-center font-semibold text-[var(--brand)]">Open WhatsApp</Link>
        </div>
      </section>
    </PageShell>
  );
}
