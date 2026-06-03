# Deployment

1. Provision PostgreSQL and set `DATABASE_URL`.
2. Set `NEXT_PUBLIC_SITE_URL`, admin credentials, `ADMIN_SESSION_SECRET`, `PAYMENT_PROVIDER`, provider credentials, `PAYMENT_WEBHOOK_SECRET`, `AI_PROVIDER`, and `OPENAI_API_KEY`.
3. Run `npm run db:generate`, `npm run db:migrate`, and `npm run db:seed`.
4. Run `npm run verify`.
5. Deploy to a Node-capable host such as Vercel. Configure the real domain in DNS and set it in `NEXT_PUBLIC_SITE_URL`.
