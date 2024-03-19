/*
  Warnings:

  - You are about to drop the column `InventoryNumberprefix` on the `Configuration` table. All the data in the column will be lost.
  - Added the required column `KeyName` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `KeyValue` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "InventoryNumberprefix",
ADD COLUMN     "KeyName" TEXT NOT NULL,
ADD COLUMN     "KeyValue" TEXT NOT NULL;
