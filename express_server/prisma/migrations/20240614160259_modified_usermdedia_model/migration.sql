/*
  Warnings:

  - You are about to drop the column `media` on the `usermedia` table. All the data in the column will be lost.
  - You are about to drop the column `post_image` on the `usermedia` table. All the data in the column will be lost.
  - Added the required column `blur` to the `UserMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `UserMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usermedia` DROP COLUMN `media`,
    DROP COLUMN `post_image`,
    ADD COLUMN `blur` LONGTEXT NOT NULL,
    ADD COLUMN `url` LONGTEXT NOT NULL;
