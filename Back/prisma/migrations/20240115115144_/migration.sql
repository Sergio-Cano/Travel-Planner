-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TRANSPORTE', 'ALOJAMIENTO', 'RESTAURANTE', 'ALQUILER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planning" (
    "title" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "links" TEXT[],
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("title")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
