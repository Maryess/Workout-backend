-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
