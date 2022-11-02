/*
  Warnings:

  - Added the required column `orderName` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderName" TEXT NOT NULL;
