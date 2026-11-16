# SITES EVOLVE

**Independent digital studio** — web development, software, AI & digital solutions. Founded by Vlad Serbușco in Chișinău, Moldova.

## Current build (v0.1)
- Multilingual (EN/RO/RU) responsive marketing website
- Homepage, services and service detail pages, portfolio, process, about, founder, editorial journal
- Interactive quote estimator with **indicative** ranges and prepared email request
- Contact form: Resend delivery when configured, otherwise mailto fallback
- SEO metadata, hreflang, sitemap, robots, security headers, privacy notice, health endpoint
- GitHub Actions quality checks; Next.js 16 and React 19

**Not yet launched:** secure CRM, customer accounts/portal, billing, AI chat, central client website management. These require approved integrations, databases, secrets, legal content and security testing. UI will not misrepresent them as live.

## Development

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local`. For server-side form delivery, configure `RESEND_API_KEY` and `LEAD_FROM_EMAIL` on a verified sending domain; `LEAD_TO_EMAIL` defaults to `sites.evolve7@gmail.com`. No credentials belong in the repository.

Set `NEXT_PUBLIC_SITE_URL` to the actual deployment URL for canonical metadata and sitemap. Until then local builds use a safe development URL.

## Safety

- Do not store client credentials in Git.
- No fake testimonials, performance metrics, prices or case-study outcomes.
- All staging and production work is confined to this repository.
- Before accepting business contracts, confirm branding rights, legal entity details and compliant privacy terms.

## Owner

Contact: [sites.evolve7@gmail.com](mailto:sites.evolve7@gmail.com). GitHub: [VladWebDeveloper](https://github.com/VladWebDeveloper).
