/*
  Warnings:

  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `contacts` DROP FOREIGN KEY `Contacts_id_fkey`;

-- AlterTable
ALTER TABLE `messages` ADD COLUMN `conversationsId` INTEGER NULL;

-- DropTable
DROP TABLE `contacts`;

-- CreateTable
CREATE TABLE `Conversations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversation_id` LONGTEXT NOT NULL,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_conversationsId_fkey` FOREIGN KEY (`conversationsId`) REFERENCES `Conversations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
