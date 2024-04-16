/*
  Warnings:

  - You are about to alter the column `verification_status` on the `model` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `model` MODIFY `verification_video` LONGTEXT NULL,
    MODIFY `verification_image` LONGTEXT NULL,
    MODIFY `verification_status` BOOLEAN NOT NULL DEFAULT false;
