-- CreateTable
CREATE TABLE `Reservation` (
    `reservation_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `car_type` VARCHAR(50) NOT NULL,
    `pickup_location_id` INTEGER NOT NULL,
    `pickup_date` DATETIME(3) NOT NULL,
    `return_location_id` INTEGER NOT NULL,
    `return_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_pickup_location_id_fkey` FOREIGN KEY (`pickup_location_id`) REFERENCES `Locations`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_return_location_id_fkey` FOREIGN KEY (`return_location_id`) REFERENCES `Locations`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
