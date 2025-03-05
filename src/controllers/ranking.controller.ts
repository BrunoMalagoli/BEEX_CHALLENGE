import { Request, Response } from "express";
import { RankingService } from "../services/rankingService";
const rankingService = new RankingService();
export const RankingController = {
  getUsersByRanking: async (req: Request, res: Response) => {
    try {
      const rank = req.params.rank;
      const rankedUsers = await rankingService.getUsersByRanking(rank);
      res.status(200).json(rankedUsers);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  updateUserRank: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await rankingService.updateUserRank(Number(id));
      res.status(200).json({ message: "Ranking actualizado" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};
