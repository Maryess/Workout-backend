/*
  Warnings:

  - You are about to drop the column `isComleted` on the `logWorkout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "logWorkout" DROP COLUMN "isComleted",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
