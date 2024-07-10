-- CreateIndex
CREATE INDEX `PostComment_user_id_fkey` ON `PostComment`(`user_id`);

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
