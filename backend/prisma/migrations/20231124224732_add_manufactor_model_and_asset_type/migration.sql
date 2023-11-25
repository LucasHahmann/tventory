/*
  Warnings:

  - Added the required column `AssetTypeName` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "AssetTypeName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AssetType";

-- CreateTable
CREATE TABLE "AssetType" (
    "id" SERIAL NOT NULL,
    "Type" TEXT NOT NULL,

    CONSTRAINT "AssetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "Model" TEXT NOT NULL,
    "ManufactorName" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufactor" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Manufactor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssetType_Type_key" ON "AssetType"("Type");

-- CreateIndex
CREATE UNIQUE INDEX "Model_Model_key" ON "Model"("Model");

-- CreateIndex
CREATE UNIQUE INDEX "Manufactor_Name_key" ON "Manufactor"("Name");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_AssetTypeName_fkey" FOREIGN KEY ("AssetTypeName") REFERENCES "AssetType"("Type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_ManufactorName_fkey" FOREIGN KEY ("ManufactorName") REFERENCES "Manufactor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
