import { PrismaClient } from "@prisma/client";
import haversineDistance from "../utils/haversineDistance";
import e from "express";
const prisma = new PrismaClient();

export class MatchmakingService {
  private async arePlayersCompatible(
    player1: any,
    player2: any
  ): Promise<boolean> {
    // Verifica la distancia (50 km máximo)
    // Verifica el ranking
    const getPlayer1 = async (player1: number): Promise<any> => {
      //Esta funcion podria optimizarse ya que el player1 siempre va a ser el jugador que busca partida
      try {
        await prisma.$connect();
        const user = await prisma.usuario.findUnique({
          where: { id: player1 },
        });
        if (!user) {
          throw new Error("Usuario no encontrado");
        }
        return { user };
      } catch (error) {
        return { message: "Error inesperado recuperando rango del usuario1" };
      } finally {
        await prisma.$disconnect();
      }
    };
    const getPlayer2 = async (player2: number): Promise<any> => {
      try {
        await prisma.$connect();
        const user = await prisma.usuario.findUnique({
          where: { id: player2 },
        });
        if (!user) {
          throw new Error("Usuario no encontrado");
        }
        return { user };
      } catch (error) {
        return { message: "Error inesperado recuperando rango del usuario2" };
      } finally {
        await prisma.$disconnect();
      }
    };

    const player1Data = await getPlayer1(player1);
    const player2Data = await getPlayer2(player2);

    const distance = haversineDistance(
      Number(player1Data.user.latitud),
      Number(player1Data.user.longitud),
      Number(player2Data.user.latitud),
      Number(player2Data.user.longitud)
    );
    if (distance > 50) return false;
    // Bronce puede jugar con Bronce o Plata
    if (player1Data.user.ranking === "bronce") {
      return (
        player2Data.user.ranking === "bronce" ||
        player2Data.user.ranking === "plata"
      );
    }
    // Plata puede jugar con Bronce, Plata u Oro
    if (player1Data.user.ranking === "plata") {
      return (
        player2Data.user.ranking === "bronce" ||
        player2Data.user.ranking === "plata" ||
        player2Data.user.ranking === "oro"
      );
    }
    // Oro puede jugar con Plata u Oro
    if (player1Data.user.ranking === "oro") {
      return (
        player2Data.user.ranking === "plata" ||
        player2Data.user.ranking === "oro"
      );
    }

    return false;
  }
  // Busca jugadores cercanos y con ranking similar
  async findMatch(userId: number) {
    try {
      await prisma.$connect();
      const currentUser = await prisma.usuario.findUnique({
        where: { id: userId },
      });

      if (!currentUser) {
        throw new Error("Usuario no encontrado");
      }

      // Busca una partida en espera que necesite jugadores
      const waitingMatches = await prisma.match.findMany({
        where: {
          status: "en espera",
          player4Id: undefined, // Aun no tiene 4 jugadores
        },
      });
      const activeMatchesWithUser = await prisma.match.findMany({
        where: {
          status: "activa",
          OR: [
            // Busca en cualquiera de los slots de jugadores
            { player1Id: userId },
            { player2Id: userId },
            { player3Id: userId },
            { player4Id: userId },
          ],
        },
      });
      if (activeMatchesWithUser.length > 0) {
        throw new Error("El jugador ya está en una partida activa actualmente");
      }
      console.log(waitingMatches);
      if (waitingMatches.length > 0) {
        for (const match of waitingMatches) {
          const playersInMatch = [
            match.player1Id,
            match.player2Id,
            match.player3Id,
            match.player4Id,
          ].filter((player) => player !== null);
          if (playersInMatch.includes(userId)) {
            throw new Error("El jugador ya está en una partida");
          }
          // Verifica si el jugador actual es compatible con los jugadores en la partida
          const compatibilities = await Promise.all(
            playersInMatch
              .filter((player) => player !== null)
              .map(async (player) => {
                return await this.arePlayersCompatible(userId, player!);
              })
          );

          const isCompatible = compatibilities.every(Boolean);

          // Agrega al jugador actual a la partida en espera
          if (isCompatible) {
            let updateData: any = {};
            console.log({ match });
            console.log({ playersInMatch });
            try {
              if (!match.player2Id) {
                updateData.player2Id = userId;
              } else if (!match.player3Id) {
                updateData.player3Id = userId;
              } else if (!match.player4Id) {
                updateData.player4Id = userId;
              } else {
                throw new Error("La partida ya está llena");
              }
            } catch (error) {
              throw new Error("Error al agregar jugador a la partida");
            }
            const updatedPlayer2Id = updateData.player2Id ?? match.player2Id;
            const updatedPlayer3Id = updateData.player3Id ?? match.player3Id;
            const updatedPlayer4Id = updateData.player4Id ?? match.player4Id;
            const isFull = [
              match.player1Id,
              updatedPlayer2Id,
              updatedPlayer3Id,
              updatedPlayer4Id,
            ].every((id) => id !== null && id !== undefined);

            const updatedMatch = await prisma.match.update({
              where: { id: match.id },
              data: {
                ...updateData,
                status: isFull ? "activa" : "en espera",
              },
            });
            return updatedMatch;
          }
        }
      } else {
        // Si no es compatible con ningun partido en espera, crea una nueva partida
        const match = await prisma.match.create({
          data: {
            player1Id: userId,
            player2Id: undefined,
            player3Id: undefined,
            player4Id: undefined,
            status: "en espera",
          },
        });
        return match;
      }
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
