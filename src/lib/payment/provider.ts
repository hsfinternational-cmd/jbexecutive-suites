export type PaymentIntentInput = {
  amount: number;
  currency: string;
  bookingReference: string;
  method: "card" | "mobile_money" | "pay_on_arrival" | "bank_transfer";
};

export type PaymentIntentResult = {
  status: "pending" | "not_required";
  providerReference: string;
  instructions: string;
};

export interface PaymentProvider {
  createIntent(input: PaymentIntentInput): Promise<PaymentIntentResult>;
  verifyWebhook(payload: string, signature: string | null): Promise<boolean>;
}

class PlaceholderPaymentProvider implements PaymentProvider {
  async createIntent(input: PaymentIntentInput): Promise<PaymentIntentResult> {
    if (process.env.NODE_ENV === "production" && input.method !== "pay_on_arrival") {
      throw new Error("A real payment provider must be configured before external payments can be accepted.");
    }
    return {
      status: input.method === "pay_on_arrival" ? "not_required" : "pending",
      providerReference: `dev-${input.bookingReference}`,
      instructions:
        input.method === "pay_on_arrival"
          ? "Your request will be reviewed by the reservations team before confirmation."
          : "Development placeholder created. Connect a card, mobile money, or bank-transfer provider before production use.",
    };
  }

  async verifyWebhook(_payload: string, signature: string | null) {
    return Boolean(signature && process.env.PAYMENT_WEBHOOK_SECRET && signature === process.env.PAYMENT_WEBHOOK_SECRET);
  }
}

let provider: PaymentProvider | null = null;

export function getPaymentProvider() {
  provider ??= new PlaceholderPaymentProvider();
  return provider;
}
