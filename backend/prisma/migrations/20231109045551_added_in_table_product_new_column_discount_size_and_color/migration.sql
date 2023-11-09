/*
  Warnings:

  - Added the required column `color` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "discount" INTEGER NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
