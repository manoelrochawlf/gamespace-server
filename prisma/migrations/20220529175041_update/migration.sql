-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
