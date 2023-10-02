-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

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
CREATE INDEX "fk_product_category_product_idx" ON "sub_categories"("product_category_id");

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "fk_product_categories_products1" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
