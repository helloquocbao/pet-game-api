/*
  Warnings:

  - You are about to drop the column `hunger` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_userId_fkey";

-- DropIndex
DROP INDEX "Pet_userId_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "hunger",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "damage" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "hp" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "luck" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "species" TEXT NOT NULL,
ADD COLUMN     "stamina" INTEGER NOT NULL DEFAULT 100;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
