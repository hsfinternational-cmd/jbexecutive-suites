import { NextResponse } from "next/server";
import { answerGuestMessage } from "@/lib/ai/tools";
import { chatSchema } from "@/lib/validations";

const recentRequests = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const bucket = (recentRequests.get(ip) || []).filter((time) => now - time < 60_000);
  bucket.push(now);
  recentRequests.set(ip, bucket);
  return bucket.length > 20;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (rateLimited(ip)) return NextResponse.json({ reply: "Please wait a moment before sending more messages." }, { status: 429 });
  const parsed = chatSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json({ reply: answerGuestMessage(parsed.data.message), provider: process.env.AI_PROVIDER || "placeholder" });
}
