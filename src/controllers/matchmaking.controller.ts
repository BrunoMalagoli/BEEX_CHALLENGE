import { Request, Response } from "express";
import { MatchmakingService } from "../services/matchmakingService";

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
        res.status(202).json({ message: "Esperando jugadores" });
        return;
      }
      if (match.status === "activa") {
        res.status(200).json({ message: "Partida lista", match });
        return;
      } else {
        res.status(202).json({
          message: "Partida completa, esperando para comenzar.",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};
