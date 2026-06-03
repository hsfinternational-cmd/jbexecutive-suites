import { roomTypes, rooms, sampleBookings, sampleHolds } from "@/lib/data";
import type { Booking, BookingHold, BookingStatus, PaymentStatus, RoomType } from "@/lib/types";

export type AvailabilityRequest = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  roomTypeId?: string;
};

export const activeBookingStatuses: BookingStatus[] = ["pending", "held", "awaiting_payment", "confirmed", "checked_in"];

export function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T00:00:00Z`).getTime();
  const end = new Date(`${checkOut}T00:00:00Z`).getTime();
  return Math.max(0, Math.round((end - start) / 86_400_000));
}

export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
}

export function isHoldActive(hold: BookingHold, now = new Date()) {
  return new Date(hold.expiresAt) > now;
}

export function calculateQuote(roomType: RoomType, checkIn: string, checkOut: string) {
  const nights = nightsBetween(checkIn, checkOut);
  const nightlyRate = roomType.promotionalRate ?? roomType.baseNightlyRate;
  const subtotal = nightlyRate * nights;
  const taxes = Math.round(subtotal * roomType.taxRate * 100) / 100;
  const total = Math.round((subtotal + taxes + roomType.serviceFee) * 100) / 100;
  return { nights, nightlyRate, subtotal, taxes, serviceFee: roomType.serviceFee, total, currency: "USD" };
}

export function checkAvailability(
  request: AvailabilityRequest,
  bookings: Booking[] = sampleBookings,
  holds: BookingHold[] = sampleHolds,
  now = new Date(),
) {
  const guestCount = request.adults + (request.children ?? 0);
  return roomTypes
    .filter((roomType) => !request.roomTypeId || roomType.id === request.roomTypeId)
    .filter((roomType) => roomType.maxGuests >= guestCount)
    .map((roomType) => {
      const physicalRooms = rooms.filter((room) => room.roomTypeId === roomType.id && room.status === "available").length;
      const booked = bookings.filter(
        (booking) =>
          booking.roomTypeId === roomType.id &&
          activeBookingStatuses.includes(booking.status) &&
          rangesOverlap(request.checkIn, request.checkOut, booking.checkIn, booking.checkOut),
      ).length;
      const held = holds
        .filter(
          (hold) =>
            hold.roomTypeId === roomType.id &&
            isHoldActive(hold, now) &&
            rangesOverlap(request.checkIn, request.checkOut, hold.checkIn, hold.checkOut),
        )
        .reduce((sum, hold) => sum + hold.quantity, 0);
      const availableRooms = Math.max(0, physicalRooms - booked - held);
      return { roomType, availableRooms, quote: calculateQuote(roomType, request.checkIn, request.checkOut) };
    })
    .filter((result) => result.availableRooms > 0);
}

export function createTemporaryHold(request: AvailabilityRequest, roomTypeId: string, now = new Date()): BookingHold {
  const available = checkAvailability({ ...request, roomTypeId }, sampleBookings, sampleHolds, now);
  if (available.length === 0) {
    throw new Error("No rooms are available for those dates.");
  }
  return {
    id: `hold-${Date.now()}`,
    roomTypeId,
    checkIn: request.checkIn,
    checkOut: request.checkOut,
    quantity: 1,
    expiresAt: new Date(now.getTime() + 15 * 60_000).toISOString(),
  };
}

export function canTransitionBooking(from: BookingStatus, to: BookingStatus, paymentStatus: PaymentStatus = "pending") {
  const allowed: Record<BookingStatus, BookingStatus[]> = {
    pending: ["held", "awaiting_payment", "cancelled"],
    held: ["awaiting_payment", "confirmed", "cancelled"],
    awaiting_payment: paymentStatus === "paid" || paymentStatus === "not_required" ? ["confirmed", "cancelled"] : ["cancelled"],
    confirmed: ["checked_in", "cancelled", "no_show"],
    checked_in: ["checked_out"],
    checked_out: [],
    cancelled: [],
    no_show: [],
  };
  return allowed[from].includes(to);
}

export function createBookingReference() {
  return `JB-${new Date().getUTCFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}
