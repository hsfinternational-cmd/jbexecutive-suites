# JB Executive Suites Website

## Overview

This repository contains the official website for JB Executive Suites, a comfortable accommodation property in Buwate, Mulawa, Wakiso District, Uganda. The site is designed for direct mobile-first inquiries, room discovery, location lookup and WhatsApp-assisted bookings.

## Brand

- Business name: JB Executive Suites
- Tagline: Where Cleanliness Meets Comfort
- Brand colours: `#056839`, `#F26C25`, `#24312B`, `#F5F7F4`, `#FFFFFF`
- Logo asset path: `public/images/brand/jb-executive-suites-logo.png`
- Tone of voice: warm, clear, practical and trustworthy

## Features

- Responsive website
- Room listings
- Gallery
- WhatsApp booking inquiry flow
- Click-to-call actions
- Location and Google Maps directions
- Nearby conveniences section
- SEO metadata and structured data
- Optimized brochure-derived images

## Services and Amenities

- Self-contained rooms
- Bed and breakfast
- Secure car parking
- 24/7 CCTV surveillance
- Free Wi-Fi
- DSTV
- Air conditioning available in selected rooms
- Soft drinks and spirits available on request

## Room Pricing

- Standard Room: from UGX 50,000
- Comfort Room: from UGX 80,000
- Executive Room: from UGX 100,000

Pricing is configurable from the content model in `src/lib/data.ts`.

## Location

- Address: Buwate, Mulawa, Shimoni Road, Wakiso District, Uganda
- Coordinates: `0.410776, 32.641678`
- Google Maps directions: `https://www.google.com/maps/dir/?api=1&destination=0.410776,32.641678`

## Contact

- `0393003491`
- `0705963661`
- WhatsApp booking URL: `https://wa.me/256705963661`

## Project Structure

- `src/app`: App Router pages, metadata routes, API routes and admin screens
- `src/components`: reusable site UI, booking inquiry form and contact actions
- `src/lib`: content model, booking logic, payment adapter and AI helper code
- `public/images`: brand, property, room, amenities, location and social assets
- `prisma`: schema, migration and seed script
- `tests`: Vitest and Playwright coverage

## Local Development

```bash
npm install
docker compose up -d
copy .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Additional commands:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run build`
- `npm run start`

## Content Updates

Update these values in `src/lib/data.ts`:

- Room prices and room labels
- Telephone numbers
- WhatsApp number and prefilled message
- Address and coordinates
- Amenities and trust signals
- Nearby services
- SEO-facing property description

Update these folders for media:

- `public/images/rooms`
- `public/images/property`
- `public/images/amenities`
- `public/images/location`
- `public/images/social`

## Image Guidelines

- Preferred display formats: WebP for website images, PNG where transparency is required
- Naming convention: lowercase, hyphen-separated descriptive file names
- Compression: export web images at sensible quality for mobile loading
- Alt text: every meaningful image should describe the real scene or room clearly
- Storage: final web assets live under `public/images`, original extracted source material can remain outside that folder while curating

## Deployment

The project is ready for Vercel deployment as a Next.js application. Typical flow:

```bash
npm run build
npx vercel
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel for canonical metadata and sharing tags.

## GitHub Workflow

- Working branch: `feat/jb-suites-website-refresh`
- Recommended commit message: `feat: refresh JB Executive Suites website and booking experience`
- Pull request flow: push the feature branch to `origin` and open a PR against `master`

## Social Assets

The supplied Facebook campaign files are stored in:

- `public/images/social/facebook-ad-square.png`
- `public/images/social/facebook-ad-portrait.png`

## Notes

- Availability must be confirmed by staff
- Exact nearby-business distances should only be published after verification
- Unsupported claims should not be added without business approval
