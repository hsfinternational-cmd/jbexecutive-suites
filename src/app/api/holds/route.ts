import { NextResponse } from "next/server";
import { createTemporaryHold } from "@/lib/booking/rules";
import { availabilitySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = availabilitySchema.safeParse(body);
  if (!parsed.success || !body.roomTypeId) return NextResponse.json({ error: parsed.success ? "roomTypeId is required" : parsed.error.flatten() }, { status: 400 });
  try {
    return NextResponse.json({ hold: createTemporaryHold(parsed.data, body.roomTypeId) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create hold." }, { status: 409 });
  }
}
