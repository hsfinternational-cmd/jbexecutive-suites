import { z } from "zod";
import { facilities, policies, property, roomTypes, sampleBookings } from "@/lib/data";
import { calculateQuote, checkAvailability, createTemporaryHold } from "@/lib/booking/rules";
import { availabilitySchema } from "@/lib/validations";

const roomSlugSchema = z.object({ slug: z.string() });
const quoteSchema = availabilitySchema.safeExtend({ roomTypeId: z.string() });
const retrieveSchema = z.object({ reference: z.string(), emailOrPhone: z.string() });

export const aiTools = {
  getPropertyInformation: {
    schema: z.object({}),
    run: () => ({ property, facilities, policies }),
  },
  listRoomTypes: {
    schema: z.object({}),
    run: () => roomTypes.map(({ id, name, slug, maxGuests, baseNightlyRate, promotionalRate }) => ({ id, name, slug, maxGuests, baseNightlyRate, promotionalRate })),
  },
  getRoomTypeDetails: {
    schema: roomSlugSchema,
    run: (input: z.infer<typeof roomSlugSchema>) => roomTypes.find((roomType) => roomType.slug === input.slug),
  },
  checkAvailability: {
    schema: availabilitySchema,
    run: (input: z.infer<typeof availabilitySchema>) => checkAvailability(input),
  },
  calculateQuote: {
    schema: quoteSchema,
    run: (input: z.infer<typeof quoteSchema>) => {
      const roomType = roomTypes.find((candidate) => candidate.id === input.roomTypeId);
      if (!roomType) throw new Error("Unknown room type.");
      return calculateQuote(roomType, input.checkIn, input.checkOut);
    },
  },
  createTemporaryHold: {
    schema: quoteSchema,
    run: (input: z.infer<typeof quoteSchema>) => createTemporaryHold(input, input.roomTypeId),
  },
  collectBookingDetails: {
    schema: z.object({ fullName: z.string(), email: z.string().email(), phone: z.string(), country: z.string() }),
    run: (input: { fullName: string; email: string; phone: string; country: string }) => ({ collected: true, input }),
  },
  createPendingBooking: {
    schema: z.object({ reference: z.string() }),
    run: (input: { reference: string }) => ({ status: "pending", reference: input.reference }),
  },
  retrieveBooking: {
    schema: retrieveSchema,
    run: (input: z.infer<typeof retrieveSchema>) =>
      sampleBookings.find(
        (booking) =>
          booking.reference.toLowerCase() === input.reference.toLowerCase() &&
          (booking.guest.email.toLowerCase() === input.emailOrPhone.toLowerCase() || booking.guest.phone === input.emailOrPhone),
      ),
  },
  requestHumanHandoff: {
    schema: z.object({ name: z.string().optional(), phone: z.string().optional(), message: z.string() }),
    run: (input: { name?: string; phone?: string; message: string }) => ({ queued: true, whatsapp: property.whatsappNumber, ...input }),
  },
};

export function answerGuestMessage(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("availability") || normalized.includes("available")) {
    return "Share your check-in date, check-out date, guests, and preferred room type, and I can check availability through the booking engine.";
  }
  if (normalized.includes("price") || normalized.includes("rate")) {
    const lead = roomTypes.map((room) => `${room.name}: from UGX ${(room.promotionalRate ?? room.baseNightlyRate).toLocaleString("en-UG")}`).join(", ");
    return `Current starting rates are ${lead}. Final totals include taxes and service fees after dates are selected.`;
  }
  if (normalized.includes("wifi") || normalized.includes("parking") || normalized.includes("breakfast")) {
    return `Yes. Key facilities include ${facilities.join(", ")}. Breakfast is available on request.`;
  }
  if (normalized.includes("whatsapp") || normalized.includes("human") || normalized.includes("callback")) {
    return `I can hand you to reservations on WhatsApp at ${property.whatsappNumber}.`;
  }
  return "I can help with rooms, prices, amenities, availability, directions, booking retrieval, and human handoff. What dates are you considering?";
}
