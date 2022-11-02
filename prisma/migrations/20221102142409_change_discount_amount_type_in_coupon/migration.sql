/*
  Warnings:

  - Changed the type of `discountAmount` on the `coupons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "discountAmount",
ADD COLUMN     "discountAmount" INTEGER NOT NULL;
