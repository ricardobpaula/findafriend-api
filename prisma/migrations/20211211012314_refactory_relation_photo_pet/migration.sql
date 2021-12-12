/*
  Warnings:

  - You are about to drop the `photos_on_pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "photos_on_pet" DROP CONSTRAINT "photos_on_pet_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "photos_on_pet" DROP CONSTRAINT "photos_on_pet_photo_id_fkey";

-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "pet_id" INTEGER;

-- DropTable
DROP TABLE "photos_on_pet";

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
