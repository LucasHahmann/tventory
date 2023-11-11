/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('Computer', 'Laptop', 'Mobile', 'Networking', 'Printer', 'Scanner');

-- DropTable
DROP TABLE "Device";

-- CreateTable
CREATE TABLE "Assets" (
    "uuid" TEXT NOT NULL,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("uuid")
);
