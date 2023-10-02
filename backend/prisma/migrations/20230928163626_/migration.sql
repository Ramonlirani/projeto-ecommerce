/*
  Warnings:

  - You are about to drop the `subcategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_subcategory" DROP CONSTRAINT "fk_product_subcategories";

-- DropForeignKey
ALTER TABLE "subcategories" DROP CONSTRAINT "fk_product_categories_subcategory";

-- DropTable
DROP TABLE "subcategories";

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "product_category_id" TEXT NOT NULL,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_category_subcategory_idx" ON "sub_categories"("product_category_id");

-- AddForeignKey
ALTER TABLE "product_subcategory" ADD CONSTRAINT "fk_product_subcategories" FOREIGN KEY ("sub_categories_id") REFERENCES "sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "fk_product_categories_subcategory" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
