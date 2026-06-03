import Image from "next/image";
import Link from "next/link";
import { BedDouble, Maximize2, Users } from "lucide-react";
import type { RoomType } from "@/lib/types";

export function RoomCard({ roomType, availableRooms }: { roomType: RoomType; availableRooms?: number }) {
  const rate = roomType.promotionalRate ?? roomType.baseNightlyRate;
  return (
    <article className="overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <Image src={roomType.images[0].url} alt={roomType.images[0].alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{roomType.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{roomType.description}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase text-[var(--muted)]">From</p>
            <p className="text-2xl font-bold text-[var(--brand-strong)]">${rate}</p>
          </div>
        </div>
        <div className="grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-3">
          <span className="inline-flex items-center gap-2"><Users size={16} /> {roomType.maxGuests} guests</span>
          <span className="inline-flex items-center gap-2"><BedDouble size={16} /> {roomType.bedConfiguration}</span>
          <span className="inline-flex items-center gap-2"><Maximize2 size={16} /> {roomType.roomSize}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {roomType.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="rounded-full bg-[#f1ede5] px-3 py-1 text-xs text-[var(--muted)]">
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-[var(--brand-strong)]">{availableRooms === undefined ? "Live inventory" : `${availableRooms} available`}</p>
          <Link href={`/rooms/${roomType.slug}`} className="rounded-md border border-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white">
            View room
          </Link>
        </div>
      </div>
    </article>
  );
}
