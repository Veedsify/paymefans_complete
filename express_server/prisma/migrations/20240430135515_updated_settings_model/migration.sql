-- DropForeignKey
ALTER TABLE `settings` DROP FOREIGN KEY `Settings_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
