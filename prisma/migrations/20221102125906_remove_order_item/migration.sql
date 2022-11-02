/*
  Warnings:

  - You are about to drop the column `deliveryPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `deliveryprices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderitems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveryCost` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderitems" DROP CONSTRAINT "orderitems_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "deliveryPrice",
ADD COLUMN     "deliveryCost" INTEGER NOT NULL;

-- DropTable
DROP TABLE "deliveryprices";

-- DropTable
DROP TABLE "orderitems";

-- CreateTable
CREATE TABLE "deliverycosts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "deliverycosts_pkey" PRIMARY KEY ("id")
);
