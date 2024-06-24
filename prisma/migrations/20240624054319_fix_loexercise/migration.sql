/*
  Warnings:

  - You are about to drop the column `logExerciseId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_logExerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "logExerciseId";

-- AlterTable
ALTER TABLE "logExercise" ADD COLUMN     "exerciseId" INTEGER;

-- AddForeignKey
ALTER TABLE "logExercise" ADD CONSTRAINT "logExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
