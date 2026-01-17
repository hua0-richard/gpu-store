/*
  Warnings:

  - You are about to drop the column `cart` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `compute` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cart",
DROP COLUMN "compute";

-- CreateTable
CREATE TABLE "PaymentEvents" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "PaymentEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentEvents_eventId_key" ON "PaymentEvents"("eventId");
