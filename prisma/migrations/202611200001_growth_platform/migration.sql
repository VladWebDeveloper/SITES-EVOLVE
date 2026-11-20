-- Additive release: client onboarding, studio tasks, privacy requests, and anonymous experiments.
ALTER TABLE "Lead" ADD COLUMN "referralCode" TEXT;
CREATE INDEX "Lead_referralCode_idx" ON "Lead"("referralCode");

CREATE TABLE "CrmTask" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "notes" TEXT,
  "leadId" TEXT,
  "assignedToId" TEXT,
  "priority" "Priority" NOT NULL DEFAULT 'NORMAL',
  "dueAt" TIMESTAMP(3),
  "doneAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CrmTask_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "CrmTask_dueAt_doneAt_idx" ON "CrmTask"("dueAt","doneAt");
CREATE INDEX "CrmTask_leadId_idx" ON "CrmTask"("leadId");

CREATE TABLE "ClientBrief" (
  "id" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "business" TEXT NOT NULL,
  "goals" TEXT NOT NULL,
  "audience" TEXT,
  "inspiration" TEXT,
  "contentStatus" TEXT,
  "notes" TEXT,
  "submittedById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ClientBrief_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ClientBrief_clientId_createdAt_idx" ON "ClientBrief"("clientId","createdAt");
ALTER TABLE "ClientBrief" ADD CONSTRAINT "ClientBrief_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "PrivacyRequest" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "note" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "reviewedAt" TIMESTAMP(3),
  CONSTRAINT "PrivacyRequest_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PrivacyRequest_status_createdAt_idx" ON "PrivacyRequest"("status","createdAt");
ALTER TABLE "PrivacyRequest" ADD CONSTRAINT "PrivacyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "ExperimentMetric" (
  "id" TEXT NOT NULL,
  "experiment" TEXT NOT NULL,
  "variant" TEXT NOT NULL,
  "event" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ExperimentMetric_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ExperimentMetric_experiment_variant_event_createdAt_idx" ON "ExperimentMetric"("experiment","variant","event","createdAt");
