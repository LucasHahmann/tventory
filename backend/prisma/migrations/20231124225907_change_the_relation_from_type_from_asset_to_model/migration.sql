/*
  Warnings:

  - You are about to drop the column `AssetTypeName` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `AssetTypeName` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_AssetTypeName_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "AssetTypeName";

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "AssetTypeName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_AssetTypeName_fkey" FOREIGN KEY ("AssetTypeName") REFERENCES "AssetType"("Type") ON DELETE RESTRICT ON UPDATE CASCADE;
