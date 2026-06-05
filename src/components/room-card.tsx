import Link from "next/link";
import { BedDouble, CircleCheckBig, MessageCircleMore, Wallet } from "lucide-react";
import { ImageSlideshow } from "@/components/image-slideshow";
import { formatUGX, property } from "@/lib/data";
import type { RoomType } from "@/lib/types";

export function RoomCard({ roomType, availableRooms }: { roomType: RoomType; availableRooms?: number }) {
  const rate = roomType.promotionalRate ?? roomType.baseNightlyRate;
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--brand-border)] bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3]">
        <ImageSlideshow images={roomType.images} altFallback={roomType.name} />
      </div>
      <div className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-3xl text-[var(--brand-green)]">{roomType.name}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">{roomType.description}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)]">From</p>
            <p className="mt-2 text-2xl font-extrabold text-[var(--brand-charcoal)]">{formatUGX(rate)}</p>
            <p className="text-xs text-[var(--brand-muted)]">per night</p>
          </div>
        </div>
        <div className="grid gap-2 text-sm text-[var(--brand-muted)] sm:grid-cols-2">
          <span className="inline-flex items-center gap-2">
            <Wallet size={16} />
            Configurable nightly rate
          </span>
          <span className="inline-flex items-center gap-2">
            <BedDouble size={16} />
            Self-contained room
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {roomType.amenities.map((amenity) => (
            <span key={amenity} className="rounded-full bg-[var(--brand-mist)] px-3 py-1 text-xs font-medium text-[var(--brand-muted)]">
              {amenity}
            </span>
          ))}
        </div>
        <p className="text-sm font-medium text-[var(--brand-green)]">
          {availableRooms === undefined ? "Availability confirmed by the team" : `${availableRooms} rooms currently open for these dates`}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/rooms/${roomType.slug}`} className="rounded-full border border-[var(--brand-green)] px-4 py-2 text-sm font-semibold text-[var(--brand-green)]">
            View room
          </Link>
          <Link
            href={`${property.whatsappUrl}?text=${encodeURIComponent(`Hello JB Executive Suites. I would like to ask about the ${roomType.name}. Please confirm availability.`)}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-4 py-2 text-sm font-semibold text-white"
          >
            <MessageCircleMore size={16} />
            Ask on WhatsApp
          </Link>
        </div>
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)]">
          <CircleCheckBig size={14} />
          Availability should be confirmed before payment
        </p>
      </div>
    </article>
  );
}
