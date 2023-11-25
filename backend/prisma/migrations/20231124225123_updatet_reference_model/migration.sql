-- DropForeignKey
ALTER TABLE "Model" DROP CONSTRAINT "Model_ManufactorName_fkey";

-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "ManufactorName" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_ManufactorName_fkey" FOREIGN KEY ("ManufactorName") REFERENCES "Manufactor"("Name") ON DELETE RESTRICT ON UPDATE CASCADE;
