/*
  Warnings:

  - The `feature` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `spesification` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "feature",
ADD COLUMN     "feature" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "spesification",
ADD COLUMN     "spesification" TEXT[] DEFAULT ARRAY[]::TEXT[];
