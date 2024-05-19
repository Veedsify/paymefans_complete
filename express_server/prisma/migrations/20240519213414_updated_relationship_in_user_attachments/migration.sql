/*
  Warnings:

  - You are about to alter the column `user_id` on the `userattachments` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `userattachments` DROP FOREIGN KEY `UserAttachments_user_id_fkey`;

-- AlterTable
ALTER TABLE `userattachments` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserAttachments` ADD CONSTRAINT `UserAttachments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
