/*
  Warnings:

  - You are about to drop the column `post_shares` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `post_shares`,
    ADD COLUMN `post_reposts` INTEGER NOT NULL DEFAULT 0;
