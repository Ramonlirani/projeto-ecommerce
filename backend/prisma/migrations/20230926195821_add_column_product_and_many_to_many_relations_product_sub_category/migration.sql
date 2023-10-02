-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "product_category_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_subcategories" (
    "product_id" TEXT NOT NULL,
    "sub_categories_id" TEXT NOT NULL,

    CONSTRAINT "products_subcategories_pkey" PRIMARY KEY ("product_id","sub_categories_id")
);

-- CreateIndex
CREATE INDEX "product_category_idx" ON "products"("product_category_id");

-- CreateIndex
CREATE INDEX "fk_product_product_idx" ON "products_subcategories"("product_id");

-- CreateIndex
CREATE INDEX "fk_subcategory_idx" ON "products_subcategories"("sub_categories_id");

-- RenameForeignKey
ALTER TABLE "sub_categories" RENAME CONSTRAINT "fk_product_categories_products1" TO "fk_product_categories_subcategory";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "fk_product_categories_products" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_subcategories" ADD CONSTRAINT "fk_product_products" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_subcategories" ADD CONSTRAINT "fk_product_subcategories" FOREIGN KEY ("sub_categories_id") REFERENCES "sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER INDEX "fk_product_category_product_idx" RENAME TO "product_category_subcategory_idx";
