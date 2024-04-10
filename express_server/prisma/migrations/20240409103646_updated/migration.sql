/*
  Warnings:

  - You are about to alter the column `user_id` on the `follow` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `follower_id` on the `follow` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `livestreamcomment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `live_id` on the `livestreamcomment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `livestreamlike` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `live_id` on the `livestreamlike` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `livestreamview` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `sender_id` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `model` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `notifications` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `post_id` on the `postcomment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `like_id` on the `postlike` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `postlike` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `post_id` on the `postlike` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `postshared` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `post_id` on the `postshared` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `reportcomment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `comment_id` on the `reportcomment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `reportlive` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `live_id` on the `reportlive` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `reportmessage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `message_id` on the `reportmessage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `reportpost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `post_id` on the `reportpost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `reportuser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `settings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `subscribers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `subscriber_id` on the `subscribers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `userlockedmedia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `media_id` on the `userlockedmedia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `usermedia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `userpoints` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `userpointspurchase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `userrepost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `post_id` on the `userrepost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `story_id` on the `userstory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `userstory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `usersubscriptioncurrent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `usertransaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `wallet_id` on the `usertransaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `userwallet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `userwithdrawalbankaccount` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `follow` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `follower_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `livestreamcomment` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `live_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `livestreamlike` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `live_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `livestreamview` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `messages` MODIFY `sender_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `model` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `notifications` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `postcomment` MODIFY `post_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `postlike` MODIFY `like_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `post_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `postshared` MODIFY `user_id` INTEGER NULL,
    MODIFY `post_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reportcomment` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `comment_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reportlive` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `live_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reportmessage` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `message_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reportpost` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `post_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reportuser` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `settings` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subscribers` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `subscriber_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userlockedmedia` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `media_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usermedia` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userpoints` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userpointspurchase` ADD COLUMN `userPointsId` INTEGER NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userrepost` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `post_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userstory` MODIFY `story_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usersubscriptioncurrent` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usersubscriptionhistory` ADD COLUMN `userSubscriptionCurrentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `usertransaction` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `wallet_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userwallet` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `userwithdrawalbankaccount` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserMedia` ADD CONSTRAINT `UserMedia_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRepost` ADD CONSTRAINT `UserRepost_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRepost` ADD CONSTRAINT `UserRepost_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLockedMedia` ADD CONSTRAINT `UserLockedMedia_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLockedMedia` ADD CONSTRAINT `UserLockedMedia_media_id_fkey` FOREIGN KEY (`media_id`) REFERENCES `UserMedia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserStory` ADD CONSTRAINT `UserStory_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComment` ADD CONSTRAINT `PostComment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostShared` ADD CONSTRAINT `PostShared_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostShared` ADD CONSTRAINT `PostShared_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscribers` ADD CONSTRAINT `Subscribers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LiveStream` ADD CONSTRAINT `LiveStream_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LiveStreamComment` ADD CONSTRAINT `LiveStreamComment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LiveStreamComment` ADD CONSTRAINT `LiveStreamComment_live_id_fkey` FOREIGN KEY (`live_id`) REFERENCES `LiveStream`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LiveStreamLike` ADD CONSTRAINT `LiveStreamLike_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LiveStreamLike` ADD CONSTRAINT `LiveStreamLike_live_id_fkey` FOREIGN KEY (`live_id`) REFERENCES `LiveStream`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LiveStreamView` ADD CONSTRAINT `LiveStreamView_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportUser` ADD CONSTRAINT `ReportUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportPost` ADD CONSTRAINT `ReportPost_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportPost` ADD CONSTRAINT `ReportPost_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportComment` ADD CONSTRAINT `ReportComment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportComment` ADD CONSTRAINT `ReportComment_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `PostComment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportLive` ADD CONSTRAINT `ReportLive_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportLive` ADD CONSTRAINT `ReportLive_live_id_fkey` FOREIGN KEY (`live_id`) REFERENCES `LiveStream`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportMessage` ADD CONSTRAINT `ReportMessage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportMessage` ADD CONSTRAINT `ReportMessage_message_id_fkey` FOREIGN KEY (`message_id`) REFERENCES `Messages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPoints` ADD CONSTRAINT `UserPoints_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWallet` ADD CONSTRAINT `UserWallet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTransaction` ADD CONSTRAINT `UserTransaction_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `UserWallet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTransaction` ADD CONSTRAINT `UserTransaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscriptionCurrent` ADD CONSTRAINT `UserSubscriptionCurrent_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscriptionHistory` ADD CONSTRAINT `UserSubscriptionHistory_userSubscriptionCurrentId_fkey` FOREIGN KEY (`userSubscriptionCurrentId`) REFERENCES `UserSubscriptionCurrent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWithdrawalBankAccount` ADD CONSTRAINT `UserWithdrawalBankAccount_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPointsPurchase` ADD CONSTRAINT `UserPointsPurchase_userPointsId_fkey` FOREIGN KEY (`userPointsId`) REFERENCES `UserPoints`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
