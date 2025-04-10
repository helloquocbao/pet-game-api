/*
  Warnings:

  - Added the required column `rarity` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('BAY', 'BO_SAT', 'THU');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY', 'MYTHICAL');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "rarity" "Rarity" NOT NULL,
ADD COLUMN     "type" "PetType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coin" INTEGER NOT NULL DEFAULT 0;
