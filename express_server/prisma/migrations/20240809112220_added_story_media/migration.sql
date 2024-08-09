-- CreateTable
CREATE TABLE `StoryMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `story_media_id` INTEGER NOT NULL,
    `media_id` INTEGER NOT NULL,
    `media_type` VARCHAR(191) NOT NULL,
    `url` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StoryMedia` ADD CONSTRAINT `StoryMedia_story_media_id_fkey` FOREIGN KEY (`story_media_id`) REFERENCES `UserStory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
