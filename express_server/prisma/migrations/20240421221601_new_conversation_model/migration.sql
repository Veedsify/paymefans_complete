-- CreateIndex
CREATE INDEX `Conversations_sender_id_fkey` ON `Conversations`(`sender_id`);

-- CreateIndex
CREATE INDEX `Conversations_receiver_id_fkey` ON `Conversations`(`receiver_id`);
