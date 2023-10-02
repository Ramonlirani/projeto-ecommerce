/*
  Warnings:

  - You are about to drop the `products_subcategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products_subcategories" DROP CONSTRAINT "fk_product_products";

-- DropForeignKey
ALTER TABLE "products_subcategories" DROP CONSTRAINT "fk_product_subcategories";

-- DropForeignKey
ALTER TABLE "sub_categories" DROP CONSTRAINT "fk_product_categories_subcategory";

-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "products_subcategories";

-- DropTable
DROP TABLE "sub_categories";

-- CreateTable
CREATE TABLE "product_subcategory" (
    "product_id" TEXT NOT NULL,
    "sub_categories_id" TEXT NOT NULL,

    CONSTRAINT "product_subcategory_pkey" PRIMARY KEY ("product_id","sub_categories_id")
);

-- CreateTable
CREATE TABLE "subcategories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "product_category_id" TEXT NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_product_product_idx" ON "product_subcategory"("product_id");

-- CreateIndex
CREATE INDEX "fk_subcategory_idx" ON "product_subcategory"("sub_categories_id");

-- CreateIndex
CREATE INDEX "product_category_subcategory_idx" ON "subcategories"("product_category_id");

-- AddForeignKey
ALTER TABLE "product_subcategory" ADD CONSTRAINT "fk_product_products" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_subcategory" ADD CONSTRAINT "fk_product_subcategories" FOREIGN KEY ("sub_categories_id") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "fk_product_categories_subcategory" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
