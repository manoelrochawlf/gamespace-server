/*
  Warnings:

  - Added the required column `user_id` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "profiles_jogos" (
    "id" TEXT NOT NULL,
    "jogos_id" TEXT NOT NULL,
    "generos_id" TEXT NOT NULL,

    CONSTRAINT "profiles_jogos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jogos_generos" (
    "id" TEXT NOT NULL,
    "jogos_id" TEXT NOT NULL,
    "generos_id" TEXT NOT NULL,

    CONSTRAINT "jogos_generos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles_jogos" ADD CONSTRAINT "profiles_jogos_jogos_id_fkey" FOREIGN KEY ("jogos_id") REFERENCES "jogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles_jogos" ADD CONSTRAINT "profiles_jogos_generos_id_fkey" FOREIGN KEY ("generos_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jogos_generos" ADD CONSTRAINT "jogos_generos_jogos_id_fkey" FOREIGN KEY ("jogos_id") REFERENCES "jogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jogos_generos" ADD CONSTRAINT "jogos_generos_generos_id_fkey" FOREIGN KEY ("generos_id") REFERENCES "generos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
