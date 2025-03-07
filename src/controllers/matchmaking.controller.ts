import { Request, Response } from "express";
import { MatchmakingService } from "../services/matchmakingService";
import { get } from "http";

const matchmakingService = new MatchmakingService();

export const MatchmakingController = {
  findMatch: async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: "Falta el parámetro: userId" });
      return;
    }

    try {
      const match = await matchmakingService.findMatch(userId);

      if (!match) {
        res.status(404).json({ message: "No se encontró la partida" });
        return;
      }
      if (match.status === "en espera") {
        console.log({ match });
        const { player1Id, player2Id, player3Id, player4Id } = match;
        const players = [player1Id, player2Id, player3Id, player4Id];
        const filledSlots = players.filter(
          (id) => id !== null && id !== undefined
        ).length;
        const emptySlots = 4 - filledSlots;
        res.status(202).json({
          message:
            "Jugador unido correctamente. Falta(n) " +
            emptySlots +
            " jugador(es)",
        });
        return;
      }
      if (match.status === "activa") {
        res.status(200).json({ message: "Partida lista", match });
        return;
      }
      res.status(500).json({ message: "Error desconocido" });
      return;
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  getActiveMatches: async (req: Request, res: Response) => {
    try {
      const matches = await matchmakingService.getActiveMatches();
      matches
        ? res.status(200).json(matches)
        : res
            .status(400)
            .json({ message: "Error inesperado al buscar partidas activas" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};
