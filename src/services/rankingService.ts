import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RankingService {
  private calculateWinRate(
    partidasJugadas: number,
    partidasGanadas: number
  ): number {
    if (partidasJugadas === 0) return 0;
    return (partidasGanadas / partidasJugadas) * 100;
  }

  async updateUserRank(userId: number): Promise<void> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: { id: userId },
      });

      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      const winRate = this.calculateWinRate(
        usuario.partidasJugadas,
        usuario.partidasGanadas
      );

      // Condiciones para subir de nivel
      if (usuario.ranking === "oro") {
        throw new Error("Ya se ha alcanzado el rango máximo");
      } else if (usuario.partidasJugadas >= 40 && winRate >= 50) {
        await prisma.usuario.update({
          where: { id: userId },
          data: { ranking: "oro" },
        });
      } else if (usuario.partidasJugadas >= 15 && winRate >= 40) {
        await prisma.usuario.update({
          where: { id: userId },
          data: { ranking: "plata" },
        });
      } else {
        throw new Error(
          "No se ha alcanzado el nivel suficiente para subir de rango"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error; // Re-lanza el error para que llegue el mensaje al front
      }
      throw new Error("Error desconocido en el servidor");
    } finally {
      await prisma.$disconnect();
    }
  }
  async getUsersByRanking(rank: string): Promise<any> {
    try {
      await prisma.$connect();
      console.log("Buscando usuarios con ranking:", rank);

      const users = await prisma.usuario.findMany({
        where: {
          ranking: rank,
        },
      });
      if (!users) {
        throw new Error("No hay usuarios en este ranking");
      }
      return users;
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }
}
