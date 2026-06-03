import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payment/provider";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("x-payment-signature");
  const verified = await getPaymentProvider().verifyWebhook(payload, signature);
  if (!verified) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  // TODO: Map verified provider events to PaymentEvent rows and booking status transitions.
  return NextResponse.json({ received: true });
}
