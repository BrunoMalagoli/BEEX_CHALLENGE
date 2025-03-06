-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_player2Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_player3Id_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_player4Id_fkey";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "player2Id" DROP NOT NULL,
ALTER COLUMN "player3Id" DROP NOT NULL,
ALTER COLUMN "player4Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_player3Id_fkey" FOREIGN KEY ("player3Id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_player4Id_fkey" FOREIGN KEY ("player4Id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
