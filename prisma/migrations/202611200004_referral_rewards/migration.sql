CREATE TABLE "ReferralProgram" (
 "id" TEXT NOT NULL,"enabled" BOOLEAN NOT NULL DEFAULT false,
 "benefitDescription" TEXT NOT NULL,"updatedAt" TIMESTAMP(3) NOT NULL,
 CONSTRAINT "ReferralProgram_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ReferralReward" (
 "id" TEXT NOT NULL,"clientId" TEXT NOT NULL,"leadId" TEXT NOT NULL,
 "benefitDescription" TEXT NOT NULL,"status" TEXT NOT NULL DEFAULT 'PENDING',
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,"fulfilledAt" TIMESTAMP(3),
 CONSTRAINT "ReferralReward_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ReferralReward_leadId_key" ON "ReferralReward"("leadId");
CREATE INDEX "ReferralReward_clientId_status_idx" ON "ReferralReward"("clientId","status");
ALTER TABLE "ReferralReward" ADD CONSTRAINT "ReferralReward_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
