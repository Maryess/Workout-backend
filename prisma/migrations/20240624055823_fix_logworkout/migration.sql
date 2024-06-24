/*
  Warnings:

  - A unique constraint covering the columns `[workoutId]` on the table `logWorkout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "logWorkout_workoutId_key" ON "logWorkout"("workoutId");
