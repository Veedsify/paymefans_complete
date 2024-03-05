/*
  Warnings:

  - A unique constraint covering the columns `[purchase_id]` on the table `UserPointsPurchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserPointsPurchase_purchase_id_key` ON `UserPointsPurchase`(`purchase_id`);
