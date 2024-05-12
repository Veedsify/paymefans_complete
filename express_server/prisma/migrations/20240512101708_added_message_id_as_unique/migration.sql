/*
  Warnings:

  - A unique constraint covering the columns `[message_id]` on the table `Messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Messages_message_id_key` ON `Messages`(`message_id`);
