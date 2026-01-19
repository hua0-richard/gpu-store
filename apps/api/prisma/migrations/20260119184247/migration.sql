/*
  Warnings:

  - You are about to drop the column `user_id` on the `Compute` table. All the data in the column will be lost.
  - Added the required column `gpuModel` to the `Compute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gpuQuant` to the `Compute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `Compute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage` to the `Compute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Compute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vCpu` to the `Compute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `PaymentEvents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Compute" DROP COLUMN "user_id",
ADD COLUMN     "gpuModel" TEXT NOT NULL,
ADD COLUMN     "gpuQuant" TEXT NOT NULL,
ADD COLUMN     "hours" TEXT NOT NULL,
ADD COLUMN     "storage" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "vCpu" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentEvents" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product" TEXT NOT NULL;
