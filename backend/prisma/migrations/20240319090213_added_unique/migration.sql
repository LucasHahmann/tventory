/*
  Warnings:

  - A unique constraint covering the columns `[KeyName]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Configuration_KeyName_key" ON "Configuration"("KeyName");
