/*
  Warnings:

  - Added the required column `discountAmount` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "discountAmount" TEXT NOT NULL;
