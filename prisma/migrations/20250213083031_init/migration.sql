-- CreateTable
CREATE TABLE `Cars` (
    `car_id` VARCHAR(191) NOT NULL,
    `make` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `vehicle_type` VARCHAR(50) NOT NULL,
    `status` ENUM('Available', 'Rented', 'Maintenance') NOT NULL,
    `image` TEXT NOT NULL,

    PRIMARY KEY (`car_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
