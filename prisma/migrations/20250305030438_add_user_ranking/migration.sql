/*
  Warnings:

  - You are about to alter the column `latitud` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `longitud` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Made the column `latitud` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitud` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "ranking" TEXT NOT NULL DEFAULT 'Bronce',
ALTER COLUMN "latitud" SET NOT NULL,
ALTER COLUMN "latitud" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "longitud" SET NOT NULL,
ALTER COLUMN "longitud" SET DATA TYPE DECIMAL(65,30);
