/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `PaymentEvents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `PaymentEvents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentEvents" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentEvents_userEmail_key" ON "PaymentEvents"("userEmail");
