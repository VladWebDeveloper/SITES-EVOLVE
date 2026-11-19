# SITES EVOLVE — Commercial handover and external dependencies

Status: production website and CRM, 19 November 2026. Only verified facts below are launch-ready.

## Customer journey
1. Public visitor reads /ro/services, /ro/work, /ro/pricing and /ro/terms.
2. Contact (/ro/contact), quote (/ro/quote) and consultation (/ro/consultation) forms create CRM records and send a verified Resend notification to the studio. Confirmation emails are transactional and are throttled per email address.
3. The OWNER reviews /console/leads, changes the status, contacts the prospect and confirms the scope.
4. OWNER creates a client, invites the client's Google email, creates the project/milestones and uploads private documents to /console/documents. Only invited members have client-side access.
5. Client visits /login then /portal, reviews milestones, approves delivery, downloads documents and sends tickets.
6. Staff responds to tickets through CRM, records draft invoices and maintenance-plan records. Fiscal issuance and card charging remain OFF without legal details and a compliant processor.
7. Daily backup cron creates and validates a custom PostgreSQL dump and verifies the private S3 upload. Daily internal operations: check site health, email outstanding NEW CRM requests after 24 hours, and run allowlisted client-site status checks.
8. OWNER can permanently delete an individual request after confirmation. The one-time CRM reset is executed separately after a verified backup.

## Operational security
- Do not send client documents, credentials or payment details into the public chat.
- Google OAuth and Client Portal permissions are isolated by client membership.
- External automation webhooks are optional and disabled until a secure HTTPS webhook and HMAC secret are provided.
- Keep AI API usage on a limited-spend project; client-facing assistant answers use a curated knowledge base without it.
- Only authorized OWNER users should delete lead and booking records. Test on staging before production.
- S3 backups are private, kept for 14 days; deleting an active CRM record does not instantly erase historical backup snapshots.
- Backup restore was tested against a separate temporary PostgreSQL database; never restore test archives over production.
- Monitor Railway deployments, Resend delivery logs and the daily backup cron.
- Current rate limiter is instance-local. Configure a distributed WAF/rate limiter before marketing traffic spikes.

## Cannot be activated without owner-supplied, verified information
1. **OpenAI API**: Project key, billing activation and a spending limit. ChatGPT subscriptions and plugin installations do not create API billing accounts.
2. **Legal identity**: Registered legal name, IDNO, full registration address, VAT status (if relevant), contact email, bank account, invoicing format and applicable tax/accounting requirements. Do not invent these.
3. **Payments**: Eligible merchant account and payment service, legal identity, refund policy and PCI-safe hosted checkout. No card collection is enabled.
4. **Contract and privacy review**: Confirm privacy controller identity, processor/subprocessor details, lawful basis and retention policy; have local legal/accounting professionals review templates before use.
5. **SEO**: Indexing is controlled by Google Search Console and may take time. Verify successful sitemap processing and page indexing in the account.

## Templates
- SERVICE-AGREEMENT-TEMPLATE.md: fill with verified identity, agreed scope and commercial terms, then have it reviewed.
- MAINTENANCE-SLA-TEMPLATE.md: agree scope, service windows, backup responsibilities and commercial support terms.

Open CRM: https://sitesevolve.com/console