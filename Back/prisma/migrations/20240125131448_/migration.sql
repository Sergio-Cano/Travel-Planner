/*
  Warnings:

  - You are about to drop the `Planning` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Planning" DROP CONSTRAINT "Planning_userId_fkey";

-- DropTable
DROP TABLE "Planning";

-- CreateTable
CREATE TABLE "Travels" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "usersId" TEXT[],

    CONSTRAINT "Travels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "links" TEXT[],
    "rating" INTEGER NOT NULL,
    "travelId" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TravelsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TravelsToUser_AB_unique" ON "_TravelsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TravelsToUser_B_index" ON "_TravelsToUser"("B");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TravelsToUser" ADD CONSTRAINT "_TravelsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Travels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TravelsToUser" ADD CONSTRAINT "_TravelsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
