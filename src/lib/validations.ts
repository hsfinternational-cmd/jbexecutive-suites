import { z } from "zod";

export const availabilitySchema = z
  .object({
    checkIn: z.string().date(),
    checkOut: z.string().date(),
    adults: z.coerce.number().int().min(1).max(8),
    children: z.coerce.number().int().min(0).max(8).default(0),
    roomTypeId: z.string().optional(),
  })
  .refine((value) => new Date(value.checkOut) > new Date(value.checkIn), {
    message: "Check-out must be after check-in.",
    path: ["checkOut"],
  });

export const bookingSchema = availabilitySchema.safeExtend({
  roomTypeId: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  country: z.string().min(2),
  specialRequests: z.string().max(1000).optional(),
  arrivalTime: z.string().optional(),
  paymentMethod: z.enum(["card", "mobile_money", "pay_on_arrival", "bank_transfer"]),
});

export const chatSchema = z.object({
  message: z.string().min(1).max(1000),
  conversationId: z.string().optional(),
});
