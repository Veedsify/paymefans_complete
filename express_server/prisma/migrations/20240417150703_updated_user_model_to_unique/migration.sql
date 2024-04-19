/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Model` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Model_user_id_key` ON `Model`(`user_id`);
