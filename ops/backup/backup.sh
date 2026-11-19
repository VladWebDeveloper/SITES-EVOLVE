#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
for name in DATABASE_URL S3_ENDPOINT S3_BUCKET S3_REGION S3_ACCESS_KEY_ID S3_SECRET_ACCESS_KEY; do
  if [[ -z "$(printenv "$name" 2>/dev/null || true)" ]]; then
    echo "ERROR: Required backup setting is missing: $name"
    exit 1
  fi
done
export AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION="$S3_REGION"
export AWS_EC2_METADATA_DISABLED=true
export AWS_REQUEST_CHECKSUM_CALCULATION=when_required
export AWS_RESPONSE_CHECKSUM_VALIDATION=when_required
aws configure set default.s3.addressing_style virtual

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
PREFIX="backups/postgres"
KEY="$PREFIX/$STAMP.dump"
ARCHIVE="$TMP_DIR/$STAMP.dump"

echo "SITES EVOLVE: Starting private PostgreSQL backup $STAMP."
pg_dump --dbname="$DATABASE_URL" --format=custom --compress=5 --no-owner --no-acl --file="$ARCHIVE"
pg_restore --list "$ARCHIVE" >/dev/null
SIZE="$(wc -c < "$ARCHIVE" | tr -d ' ')"
test "$SIZE" -gt 1000 || { echo "ERROR: Backup file unexpectedly small."; exit 1; }
CHECKSUM="$(sha256sum "$ARCHIVE" | awk '{print $1}')"

aws s3api put-object --bucket "$S3_BUCKET" --key "$KEY" --body "$ARCHIVE" --endpoint-url "$S3_ENDPOINT" --metadata "sha256=$CHECKSUM" --no-cli-pager >/dev/null
REMOTE_SIZE="$(aws s3api head-object --bucket "$S3_BUCKET" --key "$KEY" --endpoint-url "$S3_ENDPOINT" --query 'ContentLength' --output text --no-cli-pager)"
test "$REMOTE_SIZE" = "$SIZE" || { echo "ERROR: Backup upload integrity check failed."; exit 1; }
echo "SITES EVOLVE: Backup upload verified. Size: $SIZE bytes."

# Retention: delete only matching database dump keys older than 14 days.
CUTOFF="$(date -u -d '14 days ago' +%Y-%m-%dT%H:%M:%SZ)"
aws s3api list-objects-v2 --bucket "$S3_BUCKET" --prefix "$PREFIX/" --endpoint-url "$S3_ENDPOINT" --output json --no-cli-pager |
 jq -r --arg cutoff "$CUTOFF" '.Contents[]? | select(.LastModified < $cutoff) | .Key' |
 while IFS= read -r old_key; do
   [[ "$old_key" =~ ^backups/postgres/[0-9]{8}T[0-9]{6}Z\.dump$ ]] || continue
   aws s3api delete-object --bucket "$S3_BUCKET" --key "$old_key" --endpoint-url "$S3_ENDPOINT" --no-cli-pager >/dev/null
   echo "SITES EVOLVE: Expired one old database backup."
 done
echo "SITES EVOLVE: PostgreSQL backup completed successfully."

# Monitoring runs after the verified archive and never invalidates a good backup.
HEALTH_URL="https://sitesevolve.com/api/health"
if curl -fLsS --retry 2 --retry-delay 3 --connect-timeout 5 --max-time 25 "$HEALTH_URL" >/dev/null; then
 echo "SITES EVOLVE: Public application health check passed."
else
 echo "WARNING: The public application health endpoint did not respond successfully."
 if [[ -n "${RESEND_API_KEY:-}" && -n "${LEAD_FROM_EMAIL:-}" && -n "${LEAD_TO_EMAIL:-}" ]]; then
   jq -n --arg from "$LEAD_FROM_EMAIL" --arg to "$LEAD_TO_EMAIL" \
     --arg text "The SITES EVOLVE website health check failed during the daily backup run. Please inspect Railway deployments and https://sitesevolve.com/api/health." \
     '{from:$from,to:[$to],subject:"SITES EVOLVE — website health alert",text:$text}' |
   curl -fsS --max-time 15 -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer $RESEND_API_KEY" -H "Content-Type: application/json" \
     --data-binary @- >/dev/null || echo "WARNING: Could not deliver the health alert."
 fi
fi

if [[ -n "${CRON_SECRET:-}" ]]; then
 for ROUTE in operations monitor; do
  HTTP_STATUS="$(curl -sS --connect-timeout 5 --max-time 45 \
    -H "Authorization: Bearer $CRON_SECRET" \
    -o "$TMP_DIR/$ROUTE.json" -w '%{http_code}' \
    "https://sitesevolve.com/api/cron/$ROUTE" || true)"
  if [[ "$HTTP_STATUS" == "200" ]]; then
    echo "SITES EVOLVE: Daily $ROUTE checks completed (HTTP 200)."
  else
    echo "WARNING: Daily $ROUTE check returned HTTP ${HTTP_STATUS:-NETWORK_ERROR}."
  fi
 done
else
 echo "SITES EVOLVE: CRM scheduler not configured (CRON_SECRET missing)."
fi