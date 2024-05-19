/*
  Warnings:

  - You are about to drop the column `attachment` on the `userattachments` table. All the data in the column will be lost.
  - Added the required column `extension` to the `UserAttachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserAttachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `UserAttachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `UserAttachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserAttachments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userattachments` DROP FOREIGN KEY `UserAttachments_user_id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userAttachmentsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `userattachments` DROP COLUMN `attachment`,
    ADD COLUMN `extension` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `path` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserAttachments` ADD CONSTRAINT `UserAttachments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
