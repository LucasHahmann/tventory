-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_BuildingName_fkey";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_BuildingName_fkey" FOREIGN KEY ("BuildingName") REFERENCES "Building"("Name") ON DELETE CASCADE ON UPDATE CASCADE;
