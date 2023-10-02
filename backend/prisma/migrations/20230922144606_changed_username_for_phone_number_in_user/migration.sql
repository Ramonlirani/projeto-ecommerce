/*
  Warnings:

  - Made the column `phone_number` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL;
