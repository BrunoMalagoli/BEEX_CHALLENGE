import express from "express";
import { MatchmakingController } from "../controllers/matchmaking.controller";

const matchmakingRoutes = express.Router();

matchmakingRoutes.post("/find-match", MatchmakingController.findMatch);

export default matchmakingRoutes;
