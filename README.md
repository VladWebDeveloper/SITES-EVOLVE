# SITES EVOLVE — Digital Agency Platform

Premium web development, software, AI and digital solutions studio based in Chișinău, Moldova. Founded by Vlad Serbușco. Email: [sites.evolve7@gmail.com](mailto:sites.evolve7@gmail.com).

## Official production website

**[sitesevolve.com](https://sitesevolve.com)** is the official SITES EVOLVE website for enquiries, consultations, web development services and an evolving portfolio. It is available in English, Romanian and Russian.

**Founder:** [Vlad Serbușco — Founder & CEO](https://www.linkedin.com/in/vlad-serbu%C8%99co-398429451/) · [Founder profile on SITES EVOLVE](https://sitesevolve.com/en/founder) · [Fashion & creative portfolio](https://sitesevolve.com/en/fashion-model).

SITES EVOLVE is an **independent web development studio based in Chișinău, Moldova**, working with businesses locally and remotely. We do not claim offices in the US or UK. The studio's public international information pages are:

- [Custom website development for US businesses](https://sitesevolve.com/en/markets/us)
- [Web design and development for UK businesses](https://sitesevolve.com/en/markets/uk)
- [Website project brief template](https://sitesevolve.com/en/insights/website-project-brief-template)
- [Booking website or booking platform?](https://sitesevolve.com/en/insights/booking-website-or-booking-platform)
- [AlviTravel project case study](https://sitesevolve.com/en/work/alvitravel)

The code and operational configuration are maintained separately. This repository contains no API keys or private client records.

## Version 0.2 — what is implemented

| Area | Delivered |
|---|---|
| Public website | Responsive premium interface, CSS 3D hero, service pages, portfolio, pricing, project estimator, founder, blog, process, contacts |
| Localization | Romanian, English and Russian routes |
| Content | Original editorial posts + database-backed Markdown publishing |
| Sales | API-backed enquiries, indicative quote builder, consultation requests, email fallback |
| Assistant | Free-tier Groq inference when configured, with knowledge-base fallback; paid OpenAI calls opt-in only |
| CRM & operations | Private dashboard for leads, customers, projects/milestones, tickets, content, appointments, invoices, subscriptions, managed sites, automation status |
| Client workspace | Private projects and milestone approvals, tickets/replies, documents, invoices, subscriptions and site status, scoped by client membership |
| Security | Google OAuth allowlist, server-side role checks, validated input, spam trap, rate-limit fallback, private file access, security headers |
| Storage | Cloudflare R2 private document upload/download when credentials supplied |
| Integrations | Resend email, signed n8n webhook, Google Analytics with consent, uptime-check cron endpoint |
| SEO | Metadata, hreflang, sitemap, robots, dynamic OpenGraph image, JSON-LD, accessible navigation |
| Engineering | Next.js 16, React 19, TypeScript, Prisma 7/PostgreSQL, migrations, GitHub Actions, Vitest, Playwright |

**Important:** External services require individual configuration and verification. Public pages are deployed on Railway; privileged CRM and client portal functionality is protected by authentication and authorization. Publishing code does not imply that every optional integration, payment gateway or storage provider is active. See `docs/RAILWAY.md` for deployment guidance.

## Requirements

Node.js 24+, npm 11+, access to a PostgreSQL instance for private modules.

```bash
npm ci
npm run db:validate
npm run db:deploy # Only after DATABASE_URL points to your intended PostgreSQL database
npm run dev
```

Local checks:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e # Requires locally running server on port 3002 and Chrome installed
```

The public pages can run without secrets locally, but CRM and portal features require a configured database, authentication and the proper roles. On production, restricted pages use authenticated access.

## Environment and production activation

Review [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md) and [docs/OPERATIONS.md](docs/OPERATIONS.md). Copy `.env.example` to `.env.local` for local work, then configure secrets in the deployment platform. The example contains placeholders only.

**Authentication setup:** create Google OAuth credentials with callback `/api/auth/callback/google`; set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` and `ADMIN_EMAILS`. Owner emails must exactly match the verified Google email. New client accounts can then be added from the protected admin dashboard.

**Legal readiness:** the site must not issue actual invoices, accept payments or claim a registered legal entity until registration, legal review and a compliant payment provider are completed. The invoice system currently tracks drafts and manual statuses; no card charges occur.

**Hosting:** verify that the hosting provider and plan permit commercial work. Vercel Hobby is not a commercial-use plan. Choose an eligible paid plan or equivalent commercial host for production.

## Change safety

Only the `VladWebDeveloper/SITES-EVOLVE` repository is modified. Projects such as AlviTravel and DDent are not changed by this code. Avoid publishing client information or secrets to source control.


## Founder and private files (v0.3)

The homepage and navigation highlight Vlad Serbușco, with a portrait placeholder. Later add a WebP portrait at public/founder-portrait.webp and set NEXT_PUBLIC_FOUNDER_PHOTO=/founder-portrait.webp before redeploying.

Private files can be stored in the new Railway S3-compatible bucket, configured with S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY. Use only reference variables in Railway, not literal secret values in GitHub. Cloudflare R2 remains supported.

Contact, quote and consultation enquiries are stored in PostgreSQL if available, even when email delivery through Resend is not configured. See docs/GO-LIVE-STATUS.md for the remaining account and legal steps.
