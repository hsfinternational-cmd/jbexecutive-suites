import { roomTypes } from "@/lib/data";

export function BookingSearch({ compact = false }: { compact?: boolean }) {
  return (
    <form action="/availability" className={`grid gap-3 rounded-lg bg-white p-4 shadow-xl ring-1 ring-black/5 ${compact ? "md:grid-cols-6" : "md:grid-cols-5"}`}>
      <label className="text-xs font-semibold uppercase text-[var(--muted)]">
        Check-in
        <input required name="checkIn" type="date" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3 text-sm text-black" />
      </label>
      <label className="text-xs font-semibold uppercase text-[var(--muted)]">
        Check-out
        <input required name="checkOut" type="date" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3 text-sm text-black" />
      </label>
      <label className="text-xs font-semibold uppercase text-[var(--muted)]">
        Adults
        <input required name="adults" type="number" min="1" max="8" defaultValue="2" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3 text-sm text-black" />
      </label>
      <label className="text-xs font-semibold uppercase text-[var(--muted)]">
        Children
        <input name="children" type="number" min="0" max="8" defaultValue="0" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3 text-sm text-black" />
      </label>
      {compact ? (
        <label className="text-xs font-semibold uppercase text-[var(--muted)]">
          Room
          <select name="roomTypeId" className="mt-2 h-11 w-full rounded-md border border-[var(--line)] px-3 text-sm text-black">
            <option value="">Any room</option>
            {roomTypes.map((roomType) => (
              <option key={roomType.id} value={roomType.id}>
                {roomType.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <button className="h-11 self-end rounded-md bg-[var(--accent)] px-5 text-sm font-bold text-white hover:bg-[#996b2c]">Search</button>
    </form>
  );
}
