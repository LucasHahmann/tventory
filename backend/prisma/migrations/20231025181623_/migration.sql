/*
  Warnings:

  - You are about to drop the column `BuildingID` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `Building` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `BuildingName` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_BuildingID_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "BuildingID",
ADD COLUMN     "BuildingName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Building_Name_key" ON "Building"("Name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_BuildingName_fkey" FOREIGN KEY ("BuildingName") REFERENCES "Building"("Name") ON DELETE RESTRICT ON UPDATE CASCADE;
