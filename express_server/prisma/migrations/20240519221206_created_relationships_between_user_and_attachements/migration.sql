-- DropForeignKey
ALTER TABLE `userattachments` DROP FOREIGN KEY `UserAttachments_user_id_fkey`;

-- AlterTable
ALTER TABLE `userattachments` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserAttachments` ADD CONSTRAINT `UserAttachments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
