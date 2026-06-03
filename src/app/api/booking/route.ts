import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { calculateQuote, checkAvailability, createBookingReference } from "@/lib/booking/rules";
import { getPaymentProvider } from "@/lib/payment/provider";
import { roomTypes } from "@/lib/data";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const availability = checkAvailability(parsed.data);
  const selected = availability.find((result) => result.roomType.id === parsed.data.roomTypeId);
  if (!selected) return NextResponse.json({ error: "Selected room type is no longer available." }, { status: 409 });

  const roomType = roomTypes.find((candidate) => candidate.id === parsed.data.roomTypeId)!;
  const quote = calculateQuote(roomType, parsed.data.checkIn, parsed.data.checkOut);
  const reference = createBookingReference();
  await getPaymentProvider().createIntent({
    amount: quote.total,
    currency: quote.currency,
    bookingReference: reference,
    method: parsed.data.paymentMethod,
  });

  redirect(`/booking/confirmation/${reference}`);
}
