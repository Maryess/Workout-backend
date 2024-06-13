/*
  Warnings:

  - You are about to drop the column `statisticId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Statistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_statisticId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Workout_id_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "statisticId";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Statistic";
