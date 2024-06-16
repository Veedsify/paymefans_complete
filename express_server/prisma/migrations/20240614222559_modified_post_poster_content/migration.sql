/*
  Warnings:

  - Added the required column `poster` to the `UserMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usermedia` ADD COLUMN `poster` LONGTEXT NOT NULL;
