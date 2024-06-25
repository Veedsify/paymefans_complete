-- AlterTable
ALTER TABLE `userpoints` MODIFY `points` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `userpointspurchase` ADD COLUMN `message` TEXT NULL;
