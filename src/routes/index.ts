import { Router } from "express";
import userRoutes from "./user.routes";
import rankingRoutes from "./ranking.routes";
import matchmakingRoutes from "./matchmaking.routes";
const routes = Router();
routes.use("/users", userRoutes);
routes.use("/ranking", rankingRoutes);
routes.use("/matchmaking", matchmakingRoutes);

export default routes;
