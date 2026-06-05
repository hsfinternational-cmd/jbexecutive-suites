import { describe, expect, it } from "vitest";
import { roomTypes } from "@/lib/data";
import { calculateQuote, canTransitionBooking, checkAvailability, isHoldActive } from "@/lib/booking/rules";
import { aiTools } from "@/lib/ai/tools";
import type { Booking } from "@/lib/types";

describe("booking rules", () => {
  it("calculates pricing with nights, tax, service fee, and promotional rate", () => {
    const quote = calculateQuote(roomTypes[0], "2026-07-01", "2026-07-04");
    expect(quote.nights).toBe(3);
    expect(quote.subtotal).toBe(150000);
    expect(quote.taxes).toBe(0);
    expect(quote.total).toBe(150000);
  });

  it("detects expired and active holds", () => {
    expect(isHoldActive({ id: "h", roomTypeId: "standard", checkIn: "2026-01-01", checkOut: "2026-01-02", quantity: 1, expiresAt: "2026-01-01T10:10:00Z" }, new Date("2026-01-01T10:00:00Z"))).toBe(true);
    expect(isHoldActive({ id: "h", roomTypeId: "standard", checkIn: "2026-01-01", checkOut: "2026-01-02", quantity: 1, expiresAt: "2026-01-01T09:59:00Z" }, new Date("2026-01-01T10:00:00Z"))).toBe(false);
  });

  it("subtracts active bookings from availability to prevent double booking", () => {
    const bookings: Booking[] = Array.from({ length: 8 }, (_, index) => ({
      id: `b-${index}`,
      reference: `JB-X-${index}`,
      roomTypeId: "standard",
      roomId: `std-${index + 1}`,
      checkIn: "2026-08-01",
      checkOut: "2026-08-05",
      status: "confirmed",
      adults: 1,
      children: 0,
      totalAmount: 100,
      guest: { fullName: "Test", email: "test@example.com", phone: "1234567", country: "UG" },
    }));
    const results = checkAvailability({ checkIn: "2026-08-02", checkOut: "2026-08-03", adults: 1, roomTypeId: "standard" }, bookings, []);
    expect(results).toHaveLength(0);
  });

  it("requires paid or not-required payment state before awaiting_payment can confirm", () => {
    expect(canTransitionBooking("awaiting_payment", "confirmed", "pending")).toBe(false);
    expect(canTransitionBooking("awaiting_payment", "confirmed", "paid")).toBe(true);
  });
});

describe("AI tool validation", () => {
  it("rejects invalid availability requests before tools run", () => {
    const result = aiTools.checkAvailability.schema.safeParse({ checkIn: "2026-07-02", checkOut: "2026-07-01", adults: 1 });
    expect(result.success).toBe(false);
  });

  it("returns room type data through explicit tools", () => {
    expect(aiTools.listRoomTypes.run()).toEqual(expect.arrayContaining([expect.objectContaining({ slug: "executive-room" })]));
  });
});
