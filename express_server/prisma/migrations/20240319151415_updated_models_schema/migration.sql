-- CreateTable
CREATE TABLE `Model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `hookup` BOOLEAN NOT NULL DEFAULT false,
    `verification_video` LONGTEXT NOT NULL,
    `verification_image` LONGTEXT NOT NULL,
    `verification_status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
