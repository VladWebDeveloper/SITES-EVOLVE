# Railway — Deployment and Infrastructure

This runbook covers the **SITES EVOLVE** Next.js 16 + Prisma 7 application. A test deployment is available at https://sites-evolve-production.up.railway.app/ro, but private modules and external providers must be configured and independently tested before commercial launch.

## 1. Create an isolated Railway project

Use the GitHub repository [VladWebDeveloper/SITES-EVOLVE](https://github.com/VladWebDeveloper/SITES-EVOLVE). Do **not** connect or redeploy unrelated GitHub projects. The first release was uploaded using Railway CLI; GitHub automatic deployment requires granting the Railway GitHub App access to **only** this repository. Until then, deploy by linking the existing project with Railway CLI and running `railway up`.

1. Open [Railway](https://railway.com/dashboard) and create a project named **sites-evolve**.
2. Select **Deploy from GitHub repo** and choose `VladWebDeveloper/SITES-EVOLVE` after authorizing Railway GitHub App for **only this repository**; alternatively use Railway CLI to link/deploy the existing project.
3. Select the `main` branch, with the repository root as the build directory. Do not create a second Railway project if the existing `sites-evolve` project is already present.
4. Railway service settings are managed through `.railway/railway.ts` (Railway Infrastructure as Code). The existing app service was configured with `railway config apply`. Review future changes with `railway config plan` before applying. Railpack builds with `npm run build` and starts with `npm run start -- -H 0.0.0.0`.
5. On the application service, go to **Settings → Networking → Generate Domain** to get a temporary `*.up.railway.app` URL.
6. Confirm `GET /api/health` returns JSON with `status:"ok"`, then test `/en`, `/ro`, `/ru`, `/en/quote`, `/en/contact`, `/en/consultation` and `/login` at the generated URL.

**Current test URL:** https://sites-evolve-production.up.railway.app/ro. This temporary domain is intended for validation, not the registered brand launch.

**Preview-safe defaults:** Public marketing pages work without third-party credentials. Until the database and authentication are configured, `/console` and `/portal` redirect to `/setup`. Contact and quote requests fall back to composing an email, and the AI assistant replies from its factual knowledge base rather than inventing AI access.

## 2. PostgreSQL

1. A PostgreSQL service named `Postgres` has already been created in the **same Railway project**. Do not create a duplicate. Provisioning consumes trial credit or incurs charges depending on the account plan.
2. The Next.js service already has a reference variable `DATABASE_URL=${{Postgres.DATABASE_URL}}`. If rebuilding the service, restore this reference instead of copying the secret. Never paste the secret into GitHub, chat, build logs or documentation.
3. Railway's configured pre-deploy command runs `npm run db:deploy:optional`. That command applies the committed Prisma migration if `DATABASE_URL` is set; migration failures stop the deployment. The first database-linked redeployment succeeded, but production data access must be checked with an authorized account.
4. Verify the Postgres service is healthy, the app deploy completed, and `/api/health` works. As part of go-live testing, verify migration status and a real authenticated read/write operation with a test client.

This initial release has no demo clients. The CRM database contains no example customers unless you create them in the secure admin dashboard.

## 3. Owner login

1. Create a Google OAuth Web Client with the callback URL: `https://YOUR_RAILWAY_DOMAIN/api/auth/callback/google` (replace with the actual generated domain).
2. Add encrypted Railway variables (never save these in the repository):
   - `AUTH_SECRET`: a new random high-entropy secret (e.g., generate with `openssl rand -base64 32` locally and paste directly into Railway).
   - `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`: from Google Cloud OAuth credentials.
   - `ADMIN_EMAILS`: the email of the Google account actually used by the studio owner, not necessarily the public support email.
3. Restrict OAuth access to the appropriate users and enable Google MFA for the owner account.
4. Redeploy, open `/login`, sign in and confirm only the studio account can access `/console`. Test `/portal` with a separately invited client account, not with real customer information.

**Note:** Creating a public contact Gmail account does not automatically make it a Google OAuth login identity. The allowlisted admin address must be owned and controlled by the user.

## 4. Email, storage, AI and automation (optional)

Use `.env.example` as a checklist; set variables in the Railway service's **Variables** tab.

- **Resend**: `RESEND_API_KEY`, verified sender `LEAD_FROM_EMAIL`, and `LEAD_TO_EMAIL=sites.evolve7@gmail.com`.
- **Cloudflare R2**: private bucket credentials `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`. Test the download endpoint denies unauthorized access.
- **AI assistant**: `OPENAI_API_KEY` and optional `OPENAI_MODEL`. Set usage limits and review the chatbot's responses before public release.
- **n8n / Make**: `AUTOMATION_WEBHOOK_URL` plus `AUTOMATION_WEBHOOK_SECRET`, with HMAC signature validation on the webhook receiver.
- **Analytics**: `NEXT_PUBLIC_GA_MEASUREMENT_ID` only after verifying the privacy notice and consent mechanisms.

## 5. Domain and SEO

While testing, omit `NEXT_PUBLIC_SITE_URL`: the site's root metadata is configured to **noindex** without a confirmed public site URL. After buying the real domain and reviewing its legal/trademark availability:

1. Add the domain in Railway Settings → Networking and configure DNS with the registrar.
2. Set `NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN` as a Railway variable and redeploy.
3. Verify canonical links, sitemap.xml, robots.txt, og:image, analytics consent and pages in each language.
4. Register the verified domain with Google Search Console.

## 6. Monitoring and operations

- Railway health check: `/api/health`.
- Before enabling uptime monitoring, set `MONITOR_ALLOWED_HOSTS` and a strong `CRON_SECRET`. Run the cron through a trusted scheduler.
- Set resource, spending and service alerts in Railway. Add backups, retention, and restore testing before storing actual client records.
- Do not activate chargeable services, auto-deploy to customers, or import real data without confirming billing and access-control settings.

### Pricing

Railway's free plan has limited included credit. Trial credits may expire. Hobby costs from **$5/month**, and usage beyond included credit can cost extra. See [Railway pricing](https://railway.com/pricing) for current plan details.

## References

- [Railway Next.js + PostgreSQL guide](https://railway.com/guides/nextjs)
- [Railway configuration as code](https://docs.railway.com/config-as-code/reference)
- [Railway pricing](https://railway.com/pricing)
