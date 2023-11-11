/*
  Warnings:

  - You are about to drop the `Assets` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Building" AS ENUM ('A', 'B');

-- DropTable
DROP TABLE "Assets";

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "EmployeeID" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "EMail" TEXT NOT NULL,
    "Buidling" "Building" NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatetAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
