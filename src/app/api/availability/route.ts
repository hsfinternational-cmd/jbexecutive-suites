import { NextResponse } from "next/server";
import { checkAvailability } from "@/lib/booking/rules";
import { availabilitySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const parsed = availabilitySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json({ results: checkAvailability(parsed.data) });
}
