"use client";

import { useState } from "react";
import { buildWhatsAppMessage, property, roomTypes } from "@/lib/data";

export function BookingInquiryForm({
  initialRoomTypeId,
  initialCheckIn,
  initialCheckOut,
}: {
  initialRoomTypeId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
}) {
  const [roomTypeId, setRoomTypeId] = useState(initialRoomTypeId || roomTypes[0]?.id || "");

  return (
    <form
      className="grid gap-4 rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const roomName = roomTypes.find((roomType) => roomType.id === roomTypeId)?.name || "";
        const url = buildWhatsAppMessage({
          guestName: String(form.get("guestName") || ""),
          roomName,
          checkIn: String(form.get("checkIn") || ""),
          checkOut: String(form.get("checkOut") || ""),
          guests: String(form.get("guests") || ""),
          telephone: String(form.get("telephone") || ""),
          email: String(form.get("email") || ""),
          message: String(form.get("message") || ""),
        });
        window.location.href = url;
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
          Guest name
          <input required name="guestName" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm" />
        </label>
        <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
          Telephone number
          <input required name="telephone" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm" />
        </label>
        <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
          Email address
          <input name="email" type="email" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm" />
        </label>
        <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
          Room preference
          <select
            name="roomTypeId"
            value={roomTypeId}
            onChange={(event) => setRoomTypeId(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm"
          >
            {roomTypes.map((roomType) => (
              <option key={roomType.id} value={roomType.id}>
                {roomType.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
          Check-in date
          <input required name="checkIn" type="date" defaultValue={initialCheckIn} className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm" />
        </label>
        <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
          Check-out date
          <input required name="checkOut" type="date" defaultValue={initialCheckOut} className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm" />
        </label>
        <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
          Number of guests
          <input required name="guests" type="number" min="1" defaultValue="2" className="mt-2 h-12 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm" />
        </label>
        <div className="rounded-3xl bg-[var(--brand-mist)] p-4 text-sm leading-6 text-[var(--brand-muted)]">
          <p className="font-semibold text-[var(--brand-charcoal)]">Before payment</p>
          <p className="mt-2">Availability should be confirmed by the JB Executive Suites team before any payment is made.</p>
        </div>
      </div>
      <label className="text-sm font-semibold text-[var(--brand-charcoal)]">
        Message
        <textarea
          name="message"
          rows={4}
          defaultValue={property.whatsappMessage}
          className="mt-2 w-full rounded-3xl border border-[var(--brand-border)] px-4 py-3 text-sm"
        />
      </label>
      <p className="text-sm text-[var(--brand-muted)]">
        Your booking is confirmed after availability has been checked by the JB Executive Suites team.
      </p>
      <button className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--brand-orange)] px-6 text-sm font-semibold text-white">
        Send inquiry on WhatsApp
      </button>
    </form>
  );
}
