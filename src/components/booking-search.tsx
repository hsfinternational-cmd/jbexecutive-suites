import { roomTypes } from "@/lib/data";

export function BookingSearch({ compact = false }: { compact?: boolean }) {
  return (
    <form
      action="/book"
      className={`grid gap-3 rounded-[var(--radius-card)] bg-white p-4 shadow-[var(--shadow-soft)] ${
        compact ? "md:grid-cols-5" : "md:grid-cols-[1.2fr_1.2fr_0.8fr_1fr_auto]"
      }`}
    >
      <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-muted)]">
        Check-in
        <input required name="checkIn" type="date" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm text-black" />
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-muted)]">
        Check-out
        <input required name="checkOut" type="date" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm text-black" />
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-muted)]">
        Guests
        <input required name="guests" type="number" min="1" max="8" defaultValue="2" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm text-black" />
      </label>
      <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-muted)]">
        Room
        <select name="roomTypeId" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm text-black">
          <option value="">Any room</option>
          {roomTypes.map((roomType) => (
            <option key={roomType.id} value={roomType.id}>
              {roomType.name}
            </option>
          ))}
        </select>
      </label>
      <button className="h-12 self-end rounded-full bg-[var(--brand-orange)] px-6 text-sm font-bold text-white hover:bg-[var(--brand-orange-light)]">
        Check availability
      </button>
    </form>
  );
}
