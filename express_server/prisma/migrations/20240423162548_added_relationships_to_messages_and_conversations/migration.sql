/*
  Warnings:

  - A unique constraint covering the columns `[conversation_id]` on the table `Conversations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_conversationsId_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_sender_id_fkey`;

-- AlterTable
ALTER TABLE `conversations` MODIFY `conversation_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `messages` MODIFY `sender_id` VARCHAR(191) NOT NULL,
    MODIFY `attachment` JSON NULL,
    MODIFY `conversationsId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Conversations_conversation_id_key` ON `Conversations`(`conversation_id`);

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_conversationsId_fkey` FOREIGN KEY (`conversationsId`) REFERENCES `Conversations`(`conversation_id`) ON DELETE SET NULL ON UPDATE CASCADE;
