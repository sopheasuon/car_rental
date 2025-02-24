-- CreateTable
CREATE TABLE `Rental` (
    `rental_id` INTEGER NOT NULL,
    `rental_start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rental_end_date` DATETIME(3) NOT NULL,
    `return_date` DATETIME(3) NOT NULL,
    `rental_cost` DECIMAL(10, 2) NOT NULL,
    `carId` VARCHAR(255) NOT NULL,
    `customerId` INTEGER NOT NULL,

    PRIMARY KEY (`rental_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Cars`(`car_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
