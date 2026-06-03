# Payment Provider Integration

`src/lib/payment/provider.ts` contains the payment-provider interface. Replace the placeholder provider with adapters for card payments, mobile money, pay on arrival, and manual bank transfer.

Production requirements:

- Never store card data.
- Verify webhook signatures before processing events.
- Create confirmed bookings only after a paid, not-required, or admin-approved payment state.
- Store raw provider event metadata in `PaymentEvent` after redacting sensitive fields.
- Keep provider credentials in environment variables.
