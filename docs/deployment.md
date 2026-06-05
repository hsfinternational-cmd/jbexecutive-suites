# Deployment

This project is configured as a Next.js application and is ready for Vercel deployment.

## Vercel

1. Connect the GitHub repository or deploy from the local directory with `npx vercel`.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. If the Prisma-backed database workflow is needed in production, also set `DATABASE_URL`, admin credentials, payment settings and any AI provider secrets.
4. Run `npm run verify` before promoting a production build.
5. Deploy with `npx vercel --prod` after the preview is confirmed.

## Build Checklist

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run test:e2e`
5. `npm run build`

## Notes

- The current public booking flow uses WhatsApp inquiry handoff, so no payment credentials are required for the core marketing site to deploy.
- If the database-backed booking/admin workflow is later activated in production, migrations and seed strategy should be reviewed before going live.
