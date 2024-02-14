/*
  Warnings:

  - A unique constraint covering the columns `[InventoryNumber]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `InventoryNumber` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "InventoryNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_InventoryNumber_key" ON "Asset"("InventoryNumber");
