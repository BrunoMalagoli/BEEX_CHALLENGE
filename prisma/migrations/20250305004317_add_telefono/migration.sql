/*
  Warnings:

  - You are about to drop the column `password` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tiendaId` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PedidoxProducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tienda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_tiendaId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoxProducto" DROP CONSTRAINT "PedidoxProducto_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoxProducto" DROP CONSTRAINT "PedidoxProducto_productoId_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_tiendaId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_tiendaId_fkey";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "password",
DROP COLUMN "tiendaId",
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3),
ADD COLUMN     "latitud" DOUBLE PRECISION,
ADD COLUMN     "longitud" DOUBLE PRECISION,
ADD COLUMN     "telefono" TEXT;

-- DropTable
DROP TABLE "Pedido";

-- DropTable
DROP TABLE "PedidoxProducto";

-- DropTable
DROP TABLE "Producto";

-- DropTable
DROP TABLE "Tienda";
