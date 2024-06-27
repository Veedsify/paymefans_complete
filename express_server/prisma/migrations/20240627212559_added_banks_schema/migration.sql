/*
  Warnings:

  - Added the required column `transaction_message` to the `UserTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type` to the `UserTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usertransaction` ADD COLUMN `transaction_message` LONGTEXT NOT NULL,
    ADD COLUMN `transaction_type` ENUM('credit', 'debit', 'pending') NOT NULL;

-- CreateTable
CREATE TABLE `UserBanks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `bank_id` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `account_name` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `routing_number` VARCHAR(191) NULL,
    `swift_code` VARCHAR(191) NULL,
    `bank_country` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `UserBanks_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserBanks` ADD CONSTRAINT `UserBanks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
