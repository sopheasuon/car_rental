-- CreateTable
CREATE TABLE `Locations` (
    `location_id` INTEGER NOT NULL,
    `location_name` VARCHAR(255) NOT NULL,
    `address` TEXT NOT NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
