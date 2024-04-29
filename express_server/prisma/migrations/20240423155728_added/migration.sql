/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `conversations` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Conversations_receiver_id_fkey` ON `conversations`;

-- DropIndex
DROP INDEX `Conversations_sender_id_fkey` ON `conversations`;

-- AlterTable
ALTER TABLE `conversations` DROP COLUMN `receiver_id`,
    DROP COLUMN `sender_id`;

-- CreateTable
CREATE TABLE `Participants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_1` VARCHAR(191) NOT NULL,
    `user_2` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ConversationsToParticipants` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ConversationsToParticipants_AB_unique`(`A`, `B`),
    INDEX `_ConversationsToParticipants_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ConversationsToParticipants` ADD CONSTRAINT `_ConversationsToParticipants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Conversations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConversationsToParticipants` ADD CONSTRAINT `_ConversationsToParticipants_B_fkey` FOREIGN KEY (`B`) REFERENCES `Participants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
