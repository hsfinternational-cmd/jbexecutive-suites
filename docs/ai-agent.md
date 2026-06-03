# AI Agent

The floating assistant posts to `/api/ai/chat`. Provider calls must stay server-side and use `AI_PROVIDER` plus `OPENAI_API_KEY`.

Allowed tools are defined in `src/lib/ai/tools.ts`: `getPropertyInformation`, `listRoomTypes`, `getRoomTypeDetails`, `checkAvailability`, `calculateQuote`, `createTemporaryHold`, `collectBookingDetails`, `createPendingBooking`, `retrieveBooking`, and `requestHumanHandoff`.

The model must not directly write to the database or override pricing, inventory, payment verification, or booking status rules. Tool calls should be logged to `AiToolCall` without sensitive payment information.
