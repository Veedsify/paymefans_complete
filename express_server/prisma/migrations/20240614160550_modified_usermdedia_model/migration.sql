/*
  Warnings:

  - You are about to drop the column `user_id` on the `usermedia` table. All the data in the column will be lost.
  - You are about to drop the `userlockedmedia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_id` to the `UserMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userlockedmedia` DROP FOREIGN KEY `UserLockedMedia_media_id_fkey`;

-- DropForeignKey
ALTER TABLE `userlockedmedia` DROP FOREIGN KEY `UserLockedMedia_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `usermedia` DROP FOREIGN KEY `UserMedia_user_id_fkey`;

-- AlterTable
ALTER TABLE `usermedia` DROP COLUMN `user_id`,
    ADD COLUMN `post_id` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `userlockedmedia`;

-- CreateIndex
CREATE INDEX `UserMedia_user_id_fkey` ON `UserMedia`(`post_id`);

-- AddForeignKey
ALTER TABLE `UserMedia` ADD CONSTRAINT `UserMedia_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMedia` ADD CONSTRAINT `UserMedia_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
