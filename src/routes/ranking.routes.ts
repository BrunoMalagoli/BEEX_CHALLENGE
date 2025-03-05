import { Router } from "express";
import { RankingController } from "../controllers/ranking.controller";
const rankingRoutes = Router();

rankingRoutes.get("/:rank", RankingController.getUsersByRanking);
rankingRoutes.patch("/:id", RankingController.updateUserRank);
export default rankingRoutes;
