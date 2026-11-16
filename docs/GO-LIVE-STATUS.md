# SITES EVOLVE — Go-live readiness (November 2026)

## What's implemented
- Public responsive website in RO/EN/RU with futuristic visuals, service pages, portfolio, estimate, consultation, founder story, photo placeholder and a journal.
- Google OAuth via Auth.js. Only allowlisted owner/staff or invited active clients can access private spaces. Studio login: `/login`; admin: `/console`; invited clients: `/portal`.
- PostgreSQL/Prisma CRM: leads, clients, invitations (account membership), projects, milestones/approvals, support tickets/messages, invoices and subscription records, managed sites and editorial articles.
- Contact, quote and consultation forms persist to CRM if database is connected, even if outbound notifications are not configured. The response distinguishes `stored` from `sent`. No automatic appointment confirmation is claimed.
- Private client file uploads/downloads via Railway's S3-compatible bucket (or Cloudflare R2). Upload requires staff authentication, and client downloads require matching account membership. The bucket itself must remain private.
- Editorial CMS: staff can create drafts, edit Markdown articles, publish/unpublish, and preview public articles.
- AI assistant: curated FAQ fallback without external key, OpenAI support when configured.
- SEO metadata and structured data; test domains are disallowed from indexing until a verified final site URL is set.

## External services and real-world checks still needed
1. **Owner signs in** with the allowlisted company Google account. Confirm `/console` opens and an unknown Google account is rejected. Never share login codes or secret keys.
2. **Client test**: from CRM create a test client, invite a separate Google email, sign into `/portal` as that email and verify it sees only its account's projects/files. Test milestone approval and ticket reply.
3. **Storage test**: in CRM → Documents, upload a small PDF to the invited client; confirm successful authorized download and a 401/403 for an anonymous request. The provisioned Railway bucket incurs usage at its current published storage rate and may stop working when trial credits expire.
4. **Email notifications**: configure `RESEND_API_KEY` and an actual verified sender domain as `LEAD_FROM_EMAIL`. Keep `LEAD_TO_EMAIL=sites.evolve7@gmail.com`. Until then, leads are saved to CRM, but the studio must review them manually; no message can truthfully claim an email was delivered. Direct Gmail SMTP is not available on Railway's trial/free/hobby plans.
5. **AI**: add `OPENAI_API_KEY` only after choosing an API spending limit. Otherwise the assistant clearly answers from its knowledge base.
6. **Payments/invoices**: do not collect card data or issue tax documents automatically. Choose a legally compatible payment service and verify your registered business information before enabling checkout.
7. **Final domain**: confirm brand name and domain ownership. Set `NEXT_PUBLIC_SITE_URL` and redeploy only when the real domain is ready; update OAuth redirect URIs in Google Cloud and Railway `AUTH_URL`.
8. **Operations**: configure provider backups/restore checks, alerting, retention policy, privacy/legal review, distributed rate limiting and a formal security/accessibility audit before real client data at scale.

## Future founder photo
Current interface intentionally displays a premium VS monogram as a photo placeholder. To replace it:
1. Add the authorized portrait to `public/founder-portrait.webp`.
2. Set Railway build variable `NEXT_PUBLIC_FOUNDER_PHOTO=/founder-portrait.webp`.
3. Redeploy the website. Test desktop/mobile cropping and obtain the person's consent before publishing.

Do not put private photographs, OAuth secrets, invoices or customer files in the public GitHub repository.

## Manual end-to-end smoke test
- Public: `/ro`, `/en`, `/ru`, `/ro/founder`, `/ro/pricing`, `/ro/quote`, `/ro/contact`.
- Visitor: valid test lead saved in CRM; invalid lead rejects; duplicate spam and too many requests handled.
- Admin: list/create client; invite user; create project/milestone; create ticket; save/edit/publish article; upload document; inspect integration settings.
- Client: sign in; see ONLY linked account; view project; approve a REVIEW milestone; reply to ticket; download own file; deny access to another client's file.
- Runtime: `/api/health` returns 200, `/api/auth/providers` lists Google, no 500 errors in Railway logs.
- Browser: Chrome desktop + mobile; keyboard navigation; reduced motion; no horizontal overflow.
