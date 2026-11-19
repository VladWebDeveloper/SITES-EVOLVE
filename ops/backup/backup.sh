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