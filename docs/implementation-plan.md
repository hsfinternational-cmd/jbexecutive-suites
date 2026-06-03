# Implementation Plan

1. Scaffold a Next.js App Router application with TypeScript, Tailwind CSS, linting, Prisma, Zod, Vitest, Playwright, and Docker Compose for PostgreSQL.
2. Model property, room types, physical rooms, bookings, holds, payments, policies, AI conversations, and audit logs in Prisma.
3. Build deterministic seed-backed booking services for pricing, availability, hold expiry, double-booking prevention strategy, and booking status transitions.
4. Deliver public pages for discovery, availability, booking, confirmation, content, policies, contact, and booking lookup.
5. Deliver a protected admin surface for bookings, calendar, room inventory, room types, rates, content, gallery, policies, AI conversations, and settings.
6. Add server-side adapters for placeholder payments and AI tools with Zod validation and documented production integration points.
7. Verify linting, type checks, unit tests, and production build.
