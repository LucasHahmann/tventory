/*
  Warnings:

  - A unique constraint covering the columns `[AssetTypeName]` on the table `Model` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Model_AssetTypeName_key" ON "Model"("AssetTypeName");
