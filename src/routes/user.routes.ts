import { Router } from "express";

import { UserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", UserController.getAllUsers);
userRoutes.post("/", UserController.createUser);
userRoutes.get("/:id", UserController.getOneUser);
userRoutes.get("/email/:email", UserController.getOneUserByEmail);
userRoutes.get(
  "/profileCompletion/:id",
  UserController.getUserProfileCompletion
); //Devuelve el valor del porcentaje completado del perfil
userRoutes.patch("/finishedMatch", UserController.recordMatchResult);
userRoutes.get("/matches/:id", UserController.getUserPlayedMatches); //Numero de partidas jugadas
userRoutes.get("/matches/winrate/:id", UserController.getUserWinRate); //Devuelve el valor del porcentaje de WinRate
export default userRoutes;
