import Image from "next/image";
import Link from "next/link";
import { property, toCallHref } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[var(--brand-charcoal)] py-12 pb-28 text-white sm:pb-12">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Image src="/images/brand/jb-executive-suites-logo.png" alt="JB Executive Suites logo" width={420} height={106} className="h-auto w-full max-w-sm rounded-xl bg-white p-3" />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/75">{property.description}</p>
        </div>
        <div className="space-y-3 text-sm text-white/80">
          <p className="font-semibold text-white">Contact</p>
          <p>{property.address}</p>
          {property.phoneNumbers.map((phone) => (
            <Link key={phone} href={toCallHref(phone)} className="block hover:text-white">
              {phone}
            </Link>
          ))}
          <Link href={property.whatsappUrl} className="block hover:text-white">
            WhatsApp booking
          </Link>
          <Link href={property.googleDirectionsUrl} className="block hover:text-white">
            Google Maps directions
          </Link>
        </div>
        <div className="space-y-3 text-sm text-white/80">
          <p className="font-semibold text-white">Explore</p>
          <Link href="/rooms" className="block hover:text-white">Rooms</Link>
          <Link href="/gallery" className="block hover:text-white">Gallery</Link>
          <Link href="/location" className="block hover:text-white">Location</Link>
          <Link href="/book" className="block hover:text-white">Booking inquiry</Link>
        </div>
      </div>
    </footer>
  );
}
