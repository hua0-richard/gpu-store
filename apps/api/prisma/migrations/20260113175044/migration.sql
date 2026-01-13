/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `RefreshSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshSession_userEmail_key" ON "RefreshSession"("userEmail");
