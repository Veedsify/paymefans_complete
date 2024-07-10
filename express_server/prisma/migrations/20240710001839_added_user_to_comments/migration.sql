/*
  Warnings:

  - You are about to alter the column `user_id` on the `postcomment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `postcomment` DROP FOREIGN KEY `PostComment_user_id_fkey`;

-- AlterTable
ALTER TABLE `postcomment` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
