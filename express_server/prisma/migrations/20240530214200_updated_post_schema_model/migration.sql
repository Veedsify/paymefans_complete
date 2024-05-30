/*
  Warnings:

  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `post_type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `user_id` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_audience` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `post_type`,
    DROP COLUMN `title`,
    DROP COLUMN `video`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `media` JSON NULL,
    ADD COLUMN `post_audience` ENUM('public', 'private', 'followers', 'subscribers') NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
