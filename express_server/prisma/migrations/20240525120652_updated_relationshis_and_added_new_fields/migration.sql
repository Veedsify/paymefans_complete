-- DropForeignKey
ALTER TABLE `Settings` DROP FOREIGN KEY `Settings_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserPoints` DROP FOREIGN KEY `UserPoints_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserWallet` DROP FOREIGN KEY `UserWallet_user_id_fkey`;

-- AlterTable
ALTER TABLE `Settings` ADD COLUMN `subscription_active` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPoints` ADD CONSTRAINT `UserPoints_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWallet` ADD CONSTRAINT `UserWallet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
