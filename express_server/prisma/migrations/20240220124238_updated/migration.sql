/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `role` ENUM('fan', 'model') NOT NULL DEFAULT 'fan',
    MODIFY `profile_image` VARCHAR(191) NULL DEFAULT '/site/avatar.png',
    MODIFY `profile_banner` VARCHAR(191) NULL DEFAULT '/site/banner.png';
