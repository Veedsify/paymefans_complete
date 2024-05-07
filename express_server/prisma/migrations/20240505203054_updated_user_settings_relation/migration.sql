/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `settings` DROP FOREIGN KEY `Settings_id_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Settings_user_id_key` ON `Settings`(`user_id`);

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
