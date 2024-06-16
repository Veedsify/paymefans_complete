/*
  Warnings:

  - You are about to drop the column `userId` on the `usermedia` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usermedia` DROP FOREIGN KEY `UserMedia_userId_fkey`;

-- AlterTable
ALTER TABLE `usermedia` DROP COLUMN `userId`;
