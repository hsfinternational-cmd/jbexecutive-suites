# JB Executive Suites Project Conventions

- Stack: Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Zod, Vitest, and Playwright.
- Commands: `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run db:migrate`, `npm run db:seed`.
- Keep database clients and external SDKs behind lazy getters or adapters.
- Do not hard-code room types in UI logic; read them from the data/database layer.
- Booking mutations must validate inputs with Zod and enforce availability in backend code.
- Production payment adapters must verify provider state before confirmation.
- Tests should cover pricing, availability, hold expiry, status transitions, AI tool validation, and booking race-risk behavior.
