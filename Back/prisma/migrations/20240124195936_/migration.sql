/*
  Warnings:

  - The primary key for the `Planning` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Planning` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Planning" DROP CONSTRAINT "Planning_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Planning_pkey" PRIMARY KEY ("id");
