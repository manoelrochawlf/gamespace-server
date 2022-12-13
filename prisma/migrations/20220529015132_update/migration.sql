/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `Cpf` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_nickname_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "nickname",
DROP COLUMN "password",
ADD COLUMN     "Cpf" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT NOT NULL,
ADD COLUMN     "isAdmin" TEXT NOT NULL;
