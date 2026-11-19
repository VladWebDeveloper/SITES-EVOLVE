# SITES EVOLVE — nightly PostgreSQL backups

Railway cron service, scheduled daily at 02:00 UTC.

Each run uses PostgreSQL 18 pg_dump custom format, validates with pg_restore,
uploads to the existing private Railway S3 bucket under backups/postgres/,
checks the uploaded object's size, then prunes matching dumps older than 14 days.

Required Railway reference variables: DATABASE_URL, S3_ENDPOINT, S3_BUCKET,
S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY. Do not commit secrets.

Restore drill: create a SEPARATE throwaway PostgreSQL database; download a
backup and run pg_restore --list backup.dump, then
pg_restore --dbname="$STAGING_DATABASE_URL" --no-owner --no-acl backup.dump.
Do not restore over the live production database.

A private bucket inside the same Railway project is not independent offsite
disaster recovery. For critical client data, additionally enable Railway Pro
volume backups/PITR or independent offsite storage and periodic restore drills.