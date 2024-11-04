-- CreateTable
CREATE TABLE "Fuel" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "octan_rating" INTEGER NOT NULL,

    CONSTRAINT "Fuel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacture" (
    "id" BIGSERIAL NOT NULL,
    "manufacture" VARCHAR NOT NULL,
    "address" VARCHAR,

    CONSTRAINT "Manufacture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "year" INTEGER,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmission" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "number_of_gears" INTEGER,

    CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" UUID NOT NULL,
    "plate" VARCHAR(20) NOT NULL,
    "manufacture_id" BIGINT,
    "model_id" BIGINT,
    "image" TEXT,
    "rentPerDay" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT,
    "availableAt" TEXT NOT NULL,
    "transmission_id" BIGINT,
    "available" BOOLEAN NOT NULL,
    "type_id" BIGINT,
    "year" INTEGER NOT NULL,
    "options" JSON,
    "specs" JSON,
    "fuel_id" BIGINT,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

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

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_fuel_id_fkey" FOREIGN KEY ("fuel_id") REFERENCES "Fuel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_manufacture_id_fkey" FOREIGN KEY ("manufacture_id") REFERENCES "Manufacture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
