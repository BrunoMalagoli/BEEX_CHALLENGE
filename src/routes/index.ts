import { Router } from "express";
import userRoutes from "./user.routes";
import rankingRoutes from "./ranking.routes";

const routes = Router();
routes.use("/users", userRoutes);
routes.use("/ranking", rankingRoutes);
export default routes;
