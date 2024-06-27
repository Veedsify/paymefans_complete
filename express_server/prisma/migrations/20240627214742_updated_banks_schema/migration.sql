/*
  Warnings:

  - A unique constraint covering the columns `[account_number]` on the table `UserBanks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserBanks_account_number_key` ON `UserBanks`(`account_number`);
