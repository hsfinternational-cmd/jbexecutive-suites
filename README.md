# JB Executive Suites

Production-ready MVP for a serviced-apartment hotel booking website inspired by a modern OTA customer journey, without copying Agoda assets or branding.

## Setup

```bash
npm install
docker compose up -d
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Environment Variables

See `.env.example` for `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, admin credentials, AI provider settings, payment provider settings, webhook secret, and WhatsApp number.

## Replace Placeholder Content

Replace files in `public/images`, update `src/lib/data.ts` or seeded database records, then use the admin content, gallery, policy, and settings sections as the persistent editing surface once the database forms are connected.

## Real Integrations

Payments are behind `src/lib/payment/provider.ts`. AI tools are behind `src/lib/ai/tools.ts` and `/api/ai/chat`. Connect real providers before production and keep credentials in environment variables.

## Routes

Public: `/`, `/rooms`, `/rooms/[slug]`, `/availability`, `/book`, `/booking/confirmation/[reference]`, `/about`, `/facilities`, `/location`, `/policies`, `/contact`, `/manage-booking`.

Admin: `/admin`, `/admin/login`, `/admin/bookings`, `/admin/bookings/[id]`, `/admin/calendar`, `/admin/rooms`, `/admin/room-types`, `/admin/rates`, `/admin/content`, `/admin/gallery`, `/admin/policies`, `/admin/ai-conversations`, `/admin/settings`.
