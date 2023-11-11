/*
  Warnings:

  - You are about to drop the column `Buidling` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `BuildingID` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "Buidling",
ADD COLUMN     "BuildingID" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Building";

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_BuildingID_fkey" FOREIGN KEY ("BuildingID") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
