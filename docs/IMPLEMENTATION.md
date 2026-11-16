# SITES EVOLVE — Platform implementation

## Architecture
- Public multilingual website (RO/EN/RU): pages, portfolio, founder, blog, pricing, quote estimator, contact and consultation requests.
- Authenticated studio console (`/console`): CRM, client membership, projects, milestones, support, document uploads, posts/CMS, finance, subscriptions, site management, appointments, automation event logs, integration status.
- Authenticated client portal (`/portal`): own projects/milestones, tickets/replies, files, invoices/subscriptions and managed sites. Per-client membership is checked server-side on every sensitive action.
- Database: PostgreSQL via Prisma ORM and its Postgres adapter; private data is never statically seeded with fictitious customers.
- Authentication: Google OAuth through Auth.js. Only allowlisted studio owners and pre-invited client accounts can sign in. No demo passwords or public registration.

## External setup required before live use
1. Create **PostgreSQL** with TLS and put `DATABASE_URL` in encrypted hosting variables; run `npm run db:deploy` once.
2. Create Google OAuth credentials; callback: `https://YOUR_DOMAIN/api/auth/callback/google`. Configure `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, strong `AUTH_SECRET` and `ADMIN_EMAILS`. Enable multi-factor authentication for admin Google accounts. Do not turn off domain/client restrictions.
3. Verify an email domain with Resend, set `RESEND_API_KEY`, `LEAD_FROM_EMAIL` and `LEAD_TO_EMAIL`. Contact and quote forms save to the database even if sending email fails.
4. For documents, create a **private** Cloudflare R2 bucket. Set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` and `R2_BUCKET`. The API limits files to 3 MB.
5. Optional: OpenAI key for AI chat (`OPENAI_API_KEY`, `OPENAI_MODEL`). Without this, the assistant clearly uses a knowledge-base fallback.
6. Optional: n8n/Make webhook with `AUTOMATION_WEBHOOK_URL` and `AUTOMATION_WEBHOOK_SECRET`. Verify `X-Sites-Evolve-Signature` HMAC-SHA256 on the receiver before accepting events.
7. Optional: set `CRON_SECRET` and `MONITOR_ALLOWED_HOSTS` to explicitly allow public HTTPS domains registered in ManagedSite. Schedule `GET /api/cron/monitor` with `Authorization: Bearer <CRON_SECRET>` only through a trusted scheduler.
8. Optional: set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Analytics remain disabled until visitor consent.
9. Before actual billing or collecting payments, register the business, approve legal documents and select a payment gateway compatible with Moldova and your settlement bank. **No live charging is implemented or claimed.**

## Technical use
```bash
npm ci
npm run db:generate
npm run typecheck
npm run lint
npm run test
npm run build
# For a configured local PostgreSQL database:
npm run db:deploy
npm run dev
```

## Security notes
- Private dashboards are inaccessible without valid OAuth and user permissions. Client record IDs are scoped using ClientMember.
- No customer payment/card information is collected. Invoice records start as DRAFT.
- Uploads are restricted to staff accounts, MIME allowlisted, nonpublic storage and attachment-only downloads.
- Lead, quote and assistant APIs validate input and use an instance-level rate-limit fallback. Add WAF/distributed rate limiting for production.
- Monitoring checks require a scheduled secret, explicit hostname allowlist, public DNS resolution and no redirects. Do not register private network hosts.
- Google OAuth admin users should have MFA and secure recovery enabled. The application does not independently enforce Google MFA.
- The privacy notice is starter copy requiring legal review and publication of the actual legal operator identity before launch.
- The current interface includes a CSS-perspective 3D hero; GSAP/Three.js and Figma source assets are optional future creative improvements rather than falsely declared complete.
- Analytics need opt-in; disable analytics if no documented consent basis.
- Back up database and R2 bucket via vendor controls and test restoration before accepting client data.
- On Vercel, a commercial project requires an eligible paid plan. Hobby is not for commercial services. Other hosts may also be suitable.

## Domain and staging
Use a private staging deployment, verify the company name/trademark, then set the final domain. All newly connected external integrations should be tested with test-only credentials first. No customer data should be imported until access controls and backup procedures are audited.

## Remaining production tasks
Real payment gateway integration, legally valid invoicing, provider-specific calendar availability synchronization, dedicated client analytics integrations, independent penetration testing, production backup/disaster recovery, realistic performance benchmarks and formal WCAG audit are still required. The source includes functional models and surfaces where sensible, but cannot activate third-party services or demonstrate live operation without credentials and production infrastructure.
