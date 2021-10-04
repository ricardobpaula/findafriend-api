-- CreateEnum
CREATE TYPE "Size" AS ENUM ('undefined', 'small', 'medium', 'big');

-- CreateTable
CREATE TABLE "species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "adopted" BOOLEAN NOT NULL DEFAULT false,
    "size" "Size" NOT NULL DEFAULT E'undefined',
    "ownerId" INTEGER NOT NULL,
    "specieId" INTEGER NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "users.email_unique" RENAME TO "users_email_key";
