/*
  Warnings:

  - You are about to drop the `Manufacture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_fuel_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_manufacture_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_model_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_transmission_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_type_id_fkey";

-- DropTable
DROP TABLE "Manufacture";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "Type";

-- DropTable
DROP TABLE "cars";

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profile_picture" VARCHAR,
    "role_id" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);
