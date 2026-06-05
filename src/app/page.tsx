import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { BookingSearch } from "@/components/booking-search";
import { PageShell } from "@/components/page-shell";
import { RoomCard } from "@/components/room-card";
import { facilities, galleryCollections, nearbyPlaces, property, roomTypes, toCallHref, trustSignals } from "@/lib/data";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.description,
    address: property.address,
    telephone: property.phoneNumbers,
    email: property.email,
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.coordinates.latitude,
      longitude: property.coordinates.longitude,
    },
    priceRange: property.priceRange,
    image: galleryCollections.map((item) => item.image),
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative min-h-[740px] overflow-hidden bg-[var(--brand-green-dark)] text-white">
        <Image src="/images/property/exterior-main-building.webp" alt="Exterior and courtyard view of JB Executive Suites in Buwate, Mulawa." fill priority className="object-cover object-center opacity-85" sizes="100vw" />
        <div className="image-wash absolute inset-0" />
        <div className="container-shell relative flex min-h-[740px] flex-col justify-end pb-12 pt-24">
          <div className="max-w-3xl pb-8">
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              Buwate, Mulawa, Wakiso District
            </p>
            <h1 className="max-w-4xl text-5xl leading-tight md:text-7xl">{property.tagline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">{property.supportLine}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={property.whatsappUrl} className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-orange)] px-5 py-3 font-semibold text-white">
                Book on WhatsApp
                <ArrowRight size={18} />
              </Link>
              <Link href="/rooms" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white">
                View Rooms
              </Link>
              <Link href={toCallHref(property.primaryPhone)} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-semibold text-white">
                <Phone size={18} />
                Call to Book
              </Link>
            </div>
          </div>
          <BookingSearch />
        </div>
      </section>

      <section className="container-shell -mt-4 py-12">
        <div className="grid gap-3 rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-soft)] md:grid-cols-5">
          {trustSignals.map((signal) => (
            <p key={signal} className="flex items-center gap-3 rounded-2xl bg-[var(--brand-mist)] px-4 py-3 text-sm font-semibold text-[var(--brand-charcoal)]">
              <CheckCircle2 size={18} className="text-[var(--brand-green)]" />
              {signal}
            </p>
          ))}
        </div>
      </section>

      <section id="overview" className="container-shell grid gap-10 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Overview</p>
          <h2 className="mt-3 text-4xl leading-tight text-[var(--brand-green)] md:text-5xl">A calm and credible place to stay near everyday essentials in Mulawa.</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            {property.description}
          </p>
        </div>
        <div className="grid gap-3">
          {[
            "Mobile-first direct booking flow",
            "Rates from UGX 50,000",
            "Google Maps directions to the property",
            "WhatsApp and click-to-call support",
          ].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-[var(--radius-card)] bg-white p-4 shadow-[var(--shadow-soft)]">
              <CheckCircle2 className="text-[var(--brand-green)]" size={20} /> {item}
            </p>
          ))}
        </div>
      </section>

      <section id="rooms" className="container-shell py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Featured rooms</p>
            <h2 className="mt-3 text-4xl text-[var(--brand-green)] md:text-5xl">Choose the room option that suits your stay and budget.</h2>
          </div>
          <Link href="/rooms" className="hidden rounded-full border border-[var(--brand-green)] px-4 py-2 text-sm font-semibold text-[var(--brand-green)] md:inline-flex">
            All rooms
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {roomTypes.map((roomType) => <RoomCard key={roomType.id} roomType={roomType} />)}
        </div>
      </section>

      <section id="facilities" className="soft-band py-16">
        <div className="container-shell grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Amenities</p>
            <h2 className="mt-4 text-3xl text-[var(--brand-green)] md:text-5xl">Clean rooms, breakfast, security and easy access to support.</h2>
            <p className="mt-4 text-[var(--brand-muted)]">
              The most important information appears early: secure parking, Wi-Fi, breakfast, DSTV and the reassurance of 24/7 CCTV surveillance.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.map((facility) => (
              <p key={facility} className="rounded-[var(--radius-card)] border border-[var(--brand-border)] bg-white p-4 shadow-[var(--shadow-soft)]">
                {facility}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Gallery preview</p>
            <h2 className="mt-3 text-4xl text-[var(--brand-green)] md:text-5xl">A truthful look at the rooms and shared spaces.</h2>
          </div>
          <Link href="/gallery" className="hidden rounded-full border border-[var(--brand-green)] px-4 py-2 text-sm font-semibold text-[var(--brand-green)] md:inline-flex">
            Open gallery
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {galleryCollections.slice(0, 4).map((item) => (
            <div key={item.image} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="25vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-8 py-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Location</p>
          <h2 className="mt-3 text-4xl text-[var(--brand-green)]">Easy to find in Buwate, Mulawa.</h2>
          <p className="mt-4 flex items-center gap-3 text-[var(--brand-muted)]">
            <MapPin size={18} className="text-[var(--brand-green)]" />
            {property.address}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={property.googleDirectionsUrl} className="rounded-full bg-[var(--brand-green)] px-5 py-3 font-semibold text-white">
              Open directions
            </Link>
            <Link href="/location" className="rounded-full border border-[var(--brand-border)] px-5 py-3 font-semibold text-[var(--brand-charcoal)]">
              View map
            </Link>
          </div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-orange)]">Nearby conveniences</p>
          <h2 className="mt-3 text-3xl text-[var(--brand-green)]">Conveniently located near everyday essentials and local services.</h2>
          <div className="mt-5 grid gap-3">
            {nearbyPlaces.map((place) => (
              <p key={place} className="rounded-2xl bg-[var(--brand-mist)] px-4 py-3 text-sm text-[var(--brand-charcoal)]">
                {place}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell rounded-[var(--radius-card)] bg-[var(--brand-green)] p-8 text-white md:p-12">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">Need a quick quote or direct help?</h2>
            <p className="mt-3 text-white/80">Tell us your dates and preferred room option. We will help you confirm availability quickly.</p>
          </div>
          <Link href={property.whatsappUrl} className="rounded-full bg-white px-5 py-3 text-center font-semibold text-[var(--brand-green)]">Open WhatsApp</Link>
        </div>
      </section>
    </PageShell>
  );
}
