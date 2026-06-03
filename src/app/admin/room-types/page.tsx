import { roomTypes } from "@/lib/data";

export default function AdminRoomTypesPage() {
  return (
    <section>
      <h1 className="text-4xl font-semibold">Room types</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {roomTypes.map((roomType) => <article key={roomType.id} className="rounded-lg bg-white p-5 shadow-sm"><h2 className="text-2xl font-semibold">{roomType.name}</h2><p className="mt-2 text-sm text-[var(--muted)]">{roomType.description}</p><p className="mt-3 font-semibold">${roomType.promotionalRate ?? roomType.baseNightlyRate}</p></article>)}
      </div>
    </section>
  );
}
