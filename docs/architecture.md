# Architecture

JB Executive Suites uses Next.js App Router with a content-first public site and supporting admin/API surfaces. The approved business details, room options, rates, map links, amenities and gallery references are centralized in `src/lib/data.ts`, which now acts as the short-term CMS-style configuration layer for the brand refresh.

The public booking journey is intentionally lightweight: search and inquiry surfaces route guests into a structured WhatsApp message and direct staff confirmation flow. This matches the current approved business process and avoids inventing unsupported instant-confirmation behavior.

The repository still includes the broader booking domain model in Prisma for future expansion. Inventory is represented as physical `Room` records attached to configurable `RoomType` records, and the booking rules module still supports availability checks, holds and status transitions. Payment and AI integrations remain behind adapters so they can be swapped or expanded later without changing the public UI architecture.
