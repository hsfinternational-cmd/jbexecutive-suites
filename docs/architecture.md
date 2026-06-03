# Architecture

JB Executive Suites uses Next.js App Router with server-rendered pages and focused client components for chat. The current MVP reads deterministic seed-backed data from `src/lib/data.ts` so the UI runs immediately, while `prisma/schema.prisma` and `prisma/seed.ts` define the production PostgreSQL shape.

Inventory is represented as physical `Room` records attached to configurable `RoomType` records. Availability checks subtract active bookings, active unexpired holds, and non-available physical rooms. In production, booking creation should run in a serializable transaction and lock candidate room rows before creating `Booking`, `BookingRoom`, `Payment`, and audit records.

Payment and AI integrations are isolated behind adapters. The placeholder payment provider refuses fake external success in production and exposes webhook signature verification placeholders. The AI assistant can only call explicitly defined tools with Zod-validated input; it never mutates booking state directly.
