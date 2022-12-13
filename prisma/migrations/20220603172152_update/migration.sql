/*
  Warnings:

  - A unique constraint covering the columns `[jogos_id]` on the table `jogos_generos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generos_id]` on the table `jogos_generos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jogos_id]` on the table `profiles_jogos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generos_id]` on the table `profiles_jogos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CoverImageUrl` to the `jogos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GameplayYouTubeUrl` to the `jogos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImdbScore` to the `jogos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TrailerYouTubeUrl` to the `jogos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Year` to the `jogos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "jogos_generos" DROP CONSTRAINT "jogos_generos_generos_id_fkey";

-- DropForeignKey
ALTER TABLE "jogos_generos" DROP CONSTRAINT "jogos_generos_jogos_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles_jogos" DROP CONSTRAINT "profiles_jogos_generos_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles_jogos" DROP CONSTRAINT "profiles_jogos_jogos_id_fkey";

-- AlterTable
ALTER TABLE "jogos" ADD COLUMN     "CoverImageUrl" TEXT NOT NULL,
ADD COLUMN     "GameplayYouTubeUrl" TEXT NOT NULL,
ADD COLUMN     "ImdbScore" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TrailerYouTubeUrl" TEXT NOT NULL,
ADD COLUMN     "Year" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "jogos_generos" ALTER COLUMN "jogos_id" DROP NOT NULL,
ALTER COLUMN "generos_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "profiles_jogos" ALTER COLUMN "jogos_id" DROP NOT NULL,
ALTER COLUMN "generos_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "isAdmin" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "jogos_generos_jogos_id_key" ON "jogos_generos"("jogos_id");

-- CreateIndex
CREATE UNIQUE INDEX "jogos_generos_generos_id_key" ON "jogos_generos"("generos_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_jogos_jogos_id_key" ON "profiles_jogos"("jogos_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_jogos_generos_id_key" ON "profiles_jogos"("generos_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");

-- AddForeignKey
ALTER TABLE "profiles_jogos" ADD CONSTRAINT "profiles_jogos_jogos_id_fkey" FOREIGN KEY ("jogos_id") REFERENCES "jogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles_jogos" ADD CONSTRAINT "profiles_jogos_generos_id_fkey" FOREIGN KEY ("generos_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jogos_generos" ADD CONSTRAINT "jogos_generos_jogos_id_fkey" FOREIGN KEY ("jogos_id") REFERENCES "jogos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jogos_generos" ADD CONSTRAINT "jogos_generos_generos_id_fkey" FOREIGN KEY ("generos_id") REFERENCES "generos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
