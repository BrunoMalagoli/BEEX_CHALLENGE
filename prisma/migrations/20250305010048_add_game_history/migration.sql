-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "partidasGanadas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "partidasJugadas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "partidasPerdidas" INTEGER NOT NULL DEFAULT 0;
