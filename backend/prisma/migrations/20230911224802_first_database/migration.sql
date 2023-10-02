-- CreateTable
CREATE TABLE "email_verifications" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_catories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "faq_catories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "faq_category_id" TEXT NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "extension" VARCHAR(10) NOT NULL,
    "fileable_type" TEXT NOT NULL,
    "fileable_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "menu_item_id" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_role" (
    "allowed" BOOLEAN NOT NULL DEFAULT false,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "permission_role_pkey" PRIMARY KEY ("permission_id","role_id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "id_father" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "model_name" VARCHAR(255),
    "target" TEXT NOT NULL DEFAULT '_self',
    "web_url" VARCHAR(255) NOT NULL,
    "web_url_base" VARCHAR(255),
    "icon" VARCHAR(255),
    "order" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_passwords" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expire_in" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "phone_number" TEXT,
    "document" TEXT,
    "perfil_photo_url" TEXT,
    "password" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "roleCode" VARCHAR(15) NOT NULL DEFAULT 'client',
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "last_login" TIMESTAMP(3),
    "role_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configurations" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_email_key" ON "email_verifications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_code_key" ON "email_verifications"("code");

-- CreateIndex
CREATE INDEX "fk_faq_category_faq_idx" ON "faqs"("faq_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- CreateIndex
CREATE INDEX "fk_permissions_has_menu_item_idx" ON "permissions"("menu_item_id");

-- CreateIndex
CREATE INDEX "fk_role_has_permissions_1_idx" ON "permission_role"("role_id");

-- CreateIndex
CREATE INDEX "fk_permission_has_role1_idx" ON "permission_role"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "reset_passwords_email_key" ON "reset_passwords"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reset_passwords_token_key" ON "reset_passwords"("token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "fk_user_has_roles1_idx" ON "users"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "configurations_key_key" ON "configurations"("key");

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "fk_faq_categories_faqs1" FOREIGN KEY ("faq_category_id") REFERENCES "faq_catories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "fk_permissions_has_menu_item" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permission_role" ADD CONSTRAINT "fk_role_has_permissions_1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permission_role" ADD CONSTRAINT "fk_permission_has_role1" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fk_user_has_role1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
