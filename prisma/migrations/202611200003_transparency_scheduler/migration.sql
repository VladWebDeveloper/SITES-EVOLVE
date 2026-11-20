CREATE TABLE "PlatformHeartbeat" (
 "id" TEXT NOT NULL,"checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "ok" BOOLEAN NOT NULL,"responseMs" INTEGER NOT NULL,"statusCode" INTEGER NOT NULL,
 CONSTRAINT "PlatformHeartbeat_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PlatformHeartbeat_checkedAt_idx" ON "PlatformHeartbeat"("checkedAt");
CREATE TABLE "PublicStatusEvent" (
 "id" TEXT NOT NULL,"kind" TEXT NOT NULL,"state" TEXT NOT NULL DEFAULT 'RESOLVED',
 "title" TEXT NOT NULL,"details" TEXT NOT NULL,
 "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "resolvedAt" TIMESTAMP(3),"published" BOOLEAN NOT NULL DEFAULT true,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT "PublicStatusEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PublicStatusEvent_published_occurredAt_idx" ON "PublicStatusEvent"("published","occurredAt");
CREATE TABLE "ScheduleState" (
 "key" TEXT NOT NULL,"nextRunAt" TIMESTAMP(3) NOT NULL,"updatedAt" TIMESTAMP(3) NOT NULL,
 CONSTRAINT "ScheduleState_pkey" PRIMARY KEY ("key")
);
-- Public history contains only verified platform deployments.
INSERT INTO "PublicStatusEvent"("id","kind","state","title","details","occurredAt")
VALUES
('release-20261120-growth','RELEASE','RESOLVED','SITES EVOLVE 2.0 launched','Public growth tools, Academy, authenticated portal and CRM upgrades deployed on Railway.','2026-11-20T19:26:20.091Z'),
('release-20261120-performance','RELEASE','RESOLVED','Mobile performance improvements','Optimized website imagery, font loading and accessible contact navigation.','2026-11-20T19:36:33.469Z')
ON CONFLICT ("id") DO NOTHING;
