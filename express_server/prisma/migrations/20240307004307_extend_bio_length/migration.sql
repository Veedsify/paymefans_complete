/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserPoints` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `bio` TEXT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserPoints_user_id_key` ON `UserPoints`(`user_id`);
