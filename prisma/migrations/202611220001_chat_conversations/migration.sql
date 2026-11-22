-- Private opt-in chat conversations, visible only to authenticated staff.
CREATE TABLE "ChatSession" (
  "id" TEXT NOT NULL,
  "publicId" VARCHAR(40) NOT NULL,
  "locale" VARCHAR(2) NOT NULL DEFAULT 'ro',
  "userId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "ChatMessage" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "role" VARCHAR(12) NOT NULL,
  "text" VARCHAR(3200) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ChatSession_publicId_key" ON "ChatSession"("publicId");
CREATE INDEX "ChatSession_updatedAt_idx" ON "ChatSession"("updatedAt");
CREATE INDEX "ChatSession_userId_updatedAt_idx" ON "ChatSession"("userId","updatedAt");
CREATE INDEX "ChatMessage_sessionId_createdAt_idx" ON "ChatMessage"("sessionId","createdAt");
ALTER TABLE "ChatSession" ADD CONSTRAINT "ChatSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
