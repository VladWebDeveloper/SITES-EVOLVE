# Operations runbook

## Daily
- Review /console/leads, /console/tickets and /console/appointments.
- Check uptime and deployment alerts.
- Verify private document uploads are not publicly accessible.

## Weekly
- Verify backup success on the managed PostgreSQL provider and R2.
- Review open dependency/security alerts and audit logs.
- Test a contact form and a client ticket from an invited test account.

## Release checklist
- Branch -> PR -> typecheck, lint, unit tests and build -> staging -> test client/admin roles -> deploy.
- Apply migrations with `npx prisma migrate deploy` to the intended database first.
- Rotate compromised keys; never place credentials into source control.
- Confirm robots/sitemap canonical URLs and correct domain.
- Confirm consent-based analytics and privacy statements before public launch.
- Test browser widths (320px, 375px, 768px, desktop), keyboard navigation and reduced motion.
- Monitor 4xx/5xx, latency, email delivery, audit events and queue delays.

## Incident handling
1. Temporarily disable affected integration in encrypted environment settings.
2. Roll back the last release through the deployment provider when warranted.
3. Inspect structured logs without exposing user or payment information.
4. Restore database backup only through a tested recovery procedure with a documented point in time.
5. Inform affected customers as required by law and the applicable contracts.

## Data retention
Set a documented policy for unconverted leads, bookings, support messages, account deletion and invoice records. Implement automatic deletion only after legal/contractual requirements have been assessed.
