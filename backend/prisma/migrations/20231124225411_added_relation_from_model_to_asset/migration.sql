/*
  Warnings:

  - Added the required column `ModelName` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "ModelName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_ModelName_fkey" FOREIGN KEY ("ModelName") REFERENCES "Model"("Model") ON DELETE RESTRICT ON UPDATE CASCADE;
