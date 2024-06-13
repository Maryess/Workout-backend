-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "logExerciseId" INTEGER;

-- CreateTable
CREATE TABLE "logExercise" (
    "id" SERIAL NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    "logWorkoutId" INTEGER,

    CONSTRAINT "logExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logWorkout" (
    "id" SERIAL NOT NULL,
    "isComleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    "workoutId" INTEGER,

    CONSTRAINT "logWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseTime" (
    "id" SERIAL NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "repeat" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "log_exercise_id" INTEGER,

    CONSTRAINT "ExerciseTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_logExerciseId_fkey" FOREIGN KEY ("logExerciseId") REFERENCES "logExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logExercise" ADD CONSTRAINT "logExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logExercise" ADD CONSTRAINT "logExercise_logWorkoutId_fkey" FOREIGN KEY ("logWorkoutId") REFERENCES "logWorkout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logWorkout" ADD CONSTRAINT "logWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logWorkout" ADD CONSTRAINT "logWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseTime" ADD CONSTRAINT "ExerciseTime_log_exercise_id_fkey" FOREIGN KEY ("log_exercise_id") REFERENCES "logExercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
