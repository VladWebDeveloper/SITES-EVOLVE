CREATE TABLE "ConsultationSlot" (
 "id" TEXT NOT NULL,
 "startAt" TIMESTAMP(3) NOT NULL,
 "bookingId" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT "ConsultationSlot_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ConsultationSlot_startAt_key" ON "ConsultationSlot"("startAt");
CREATE UNIQUE INDEX "ConsultationSlot_bookingId_key" ON "ConsultationSlot"("bookingId");
ALTER TABLE "ConsultationSlot" ADD CONSTRAINT "ConsultationSlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "BookingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE TABLE "ConsultationBlock" (
 "id" TEXT NOT NULL,
 "startsAt" TIMESTAMP(3) NOT NULL,
 "endsAt" TIMESTAMP(3) NOT NULL,
 "note" TEXT,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 CONSTRAINT "ConsultationBlock_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ConsultationBlock_startsAt_endsAt_idx" ON "ConsultationBlock"("startsAt","endsAt");
