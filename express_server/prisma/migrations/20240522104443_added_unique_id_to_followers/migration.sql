/*
  Warnings:

  - A unique constraint covering the columns `[follow_id]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Follow_follow_id_key` ON `Follow`(`follow_id`);
