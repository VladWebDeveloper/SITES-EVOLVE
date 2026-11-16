# SITES EVOLVE — Digital Agency Platform

Premium web development, software, AI and digital solutions studio based in Chișinău, Moldova. Founded by Vlad Serbușco. Email: [sites.evolve7@gmail.com](mailto:sites.evolve7@gmail.com).

## Live preview

**[SITES EVOLVE — Romanian test website](https://sites-evolve-production.up.railway.app/ro)** is hosted on Railway. This is a test deployment: the public site is available, PostgreSQL has been provisioned and linked, and private modules remain locked until Google OAuth is configured. The temporary domain is not intended for SEO indexing.

## Version 0.2 — what is implemented

| Area | Delivered |
|---|---|
| Public website | Responsive premium interface, CSS 3D hero, service pages, portfolio, pricing, project estimator, founder, blog, process, contacts |
| Localization | Romanian, English and Russian routes |
| Content | Original editorial posts + database-backed Markdown publishing |
| Sales | API-backed enquiries, indicative quote builder, consultation requests, email fallback |
| Assistant | FAQ knowledge mode; OpenAI responses integration when API key supplied |
| CRM & operations | Private dashboard for leads, customers, projects/milestones, tickets, content, appointments, invoices, subscriptions, managed sites, automation status |
| Client workspace | Private projects and milestone approvals, tickets/replies, documents, invoices, subscriptions and site status, scoped by client membership |
| Security | Google OAuth allowlist, server-side role checks, validated input, spam trap, rate-limit fallback, private file access, security headers |
| Storage | Cloudflare R2 private document upload/download when credentials supplied |
| Integrations | Resend email, signed n8n webhook, Google Analytics with consent, uptime-check cron endpoint |
| SEO | Metadata, hreflang, sitemap, robots, dynamic OpenGraph image, JSON-LD, accessible navigation |
| Engineering | Next.js 16, React 19, TypeScript, Prisma 7/PostgreSQL, migrations, GitHub Actions, Vitest, Playwright |

**Important:** Repository code can be complete and build successfully before an external service is activated. No database, Google OAuth, R2, Resend, paid payment gateway, calendar slots or AI account are claimed to be live until connected and verified. Private routes fail closed without configuration. The live test site is not yet a fully operational commercial deployment. See `docs/RAILWAY.md` for service configuration and verification.

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

The public site works without secrets, but CRM and portal routes redirect to `/setup` until authentication/database are configured.

## Environment and production activation

Review [docs/IMPLEMENTATION.md](docs/IMPLEMENTATION.md) and [docs/OPERATIONS.md](docs/OPERATIONS.md). Copy `.env.example` to `.env.local` for local work, then configure secrets in the deployment platform. The example contains placeholders only.

**Authentication setup:** create Google OAuth credentials with callback `/api/auth/callback/google`; set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` and `ADMIN_EMAILS`. Owner emails must exactly match the verified Google email. New client accounts can then be added from the protected admin dashboard.

**Legal readiness:** the site must not issue actual invoices, accept payments or claim a registered legal entity until registration, legal review and a compliant payment provider are completed. The invoice system currently tracks drafts and manual statuses; no card charges occur.

**Hosting:** verify that the hosting provider and plan permit commercial work. Vercel Hobby is not a commercial-use plan. Choose an eligible paid plan or equivalent commercial host for production.

## Change safety

Only the `VladWebDeveloper/SITES-EVOLVE` repository is modified. Projects such as AlviTravel and DDent are not changed by this code. Avoid publishing client information or secrets to source control.
