# Admin Guide

Use `/admin/login` with `ADMIN_EMAIL` and `ADMIN_PASSWORD` in development. Admin routes are protected by an HTTP-only session cookie.

Administrators can view bookings, inspect booking details, see calendar entries, update physical room status, review room types, inspect rates, manage content and gallery placeholders, edit policies, view AI conversation placeholders, and edit property settings. Persisting those edits requires connecting the Prisma-backed database forms in the next phase.
