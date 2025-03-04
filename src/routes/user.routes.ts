import { Router } from "express";

import { getUsers, createUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);

export default userRoutes;
