/*
  Warnings:

  - You are about to drop the column `conversion_rate` on the `userpointspurchase` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `userpointspurchase` table. All the data in the column will be lost.
  - Added the required column `success` to the `UserPointsPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userpointspurchase` DROP COLUMN `conversion_rate`,
    DROP COLUMN `currency`,
    ADD COLUMN `success` BOOLEAN NOT NULL;
