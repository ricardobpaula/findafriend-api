/*
  Warnings:

  - The primary key for the `pets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `photos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `species` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_specie_id_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP CONSTRAINT "pets_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "owner_id" SET DATA TYPE TEXT,
ALTER COLUMN "specie_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "pets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "pets_id_seq";

-- AlterTable
ALTER TABLE "photos" DROP CONSTRAINT "photos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "pet_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "photos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "photos_id_seq";

-- AlterTable
ALTER TABLE "species" DROP CONSTRAINT "species_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "species_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "species_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "avatar_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
