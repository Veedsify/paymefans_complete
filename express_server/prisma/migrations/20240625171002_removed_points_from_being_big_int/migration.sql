/*
  Warnings:

  - You are about to alter the column `points` on the `userpoints` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `userpoints` MODIFY `points` INTEGER NOT NULL;
