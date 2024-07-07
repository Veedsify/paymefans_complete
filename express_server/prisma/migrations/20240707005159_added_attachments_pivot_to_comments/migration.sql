/*
  Warnings:

  - You are about to drop the column `comment_id` on the `postcommentattachments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `postcommentattachments` DROP FOREIGN KEY `PostCommentAttachments_comment_id_fkey`;

-- AlterTable
ALTER TABLE `postcommentattachments` DROP COLUMN `comment_id`;

-- CreateTable
CREATE TABLE `pivot_post_comment_attachments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_comment_id` INTEGER NOT NULL,
    `post_comment_attach` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `pivot_post_comment_attachments_post_comment_id_fkey`(`post_comment_id`),
    INDEX `pivot_post_comment_attachments_post_comment_attach_fkey`(`post_comment_attach`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pivot_post_comment_attachments` ADD CONSTRAINT `pivot_post_comment_attachments_post_comment_id_fkey` FOREIGN KEY (`post_comment_id`) REFERENCES `PostComment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pivot_post_comment_attachments` ADD CONSTRAINT `pivot_post_comment_attachments_post_comment_attach_fkey` FOREIGN KEY (`post_comment_attach`) REFERENCES `PostCommentAttachments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
