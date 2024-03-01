-- AlterTable
ALTER TABLE `user` MODIFY `email_verify_code` VARCHAR(191) NULL,
    MODIFY `email_verify_time` DATETIME(3) NULL,
    MODIFY `profile_image` JSON NULL,
    MODIFY `profile_banner` JSON NULL,
    MODIFY `bio` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `website` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `zip` VARCHAR(191) NULL;
