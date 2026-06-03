import { roomTypes } from "@/lib/data";

export default function AdminRatesPage() {
  return <section><h1 className="text-4xl font-semibold">Rates</h1><div className="mt-6 grid gap-3">{roomTypes.map((roomType) => <p key={roomType.id} className="rounded-lg bg-white p-4 shadow-sm">{roomType.name}: base ${roomType.baseNightlyRate}, promo {roomType.promotionalRate ? `$${roomType.promotionalRate}` : "none"}</p>)}</div></section>;
}
