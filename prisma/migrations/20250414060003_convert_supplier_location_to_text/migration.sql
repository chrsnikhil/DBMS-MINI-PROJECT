/*
  Warnings:

  - You are about to drop the column `description` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_supplierId_fkey`;

-- DropIndex
DROP INDEX `Category_name_key` ON `category`;

-- DropIndex
DROP INDEX `Product_locationId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_supplierId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Transaction_supplierId_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `locationId`,
    DROP COLUMN `supplierId`,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `supplier` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `supplierId`,
    ADD COLUMN `supplier` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `location`;

-- DropTable
DROP TABLE `supplier`;
