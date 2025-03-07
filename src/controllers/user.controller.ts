import { Request, Response } from "express";
import { UserService } from "../services/userService";
import prisma from "../../prisma/prisma";

const userService = new UserService();

export const UserController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { nombre, email, fechaNacimiento, telefono, longitud, latitud } =
        req.body;
      const user = await userService.createUser({
        nombre,
        email,
        fechaNacimiento,
        telefono,
        longitud,
        latitud,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      users
        ? res.status(200).json(users)
        : res.status(404).json({ message: "No se encontraron usuarios" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  getOneUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userService.getOneUser(Number(id));
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  },
  getOneUserByEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const user = await userService.getOneUserByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  },
  getUserProfileCompletion: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const percentage = await userService.getUserProfileCompletion(Number(id));
      res.status(200).json(percentage);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  recordMatchResult: async (req: Request, res: Response) => {
    const { userId, result } = req.body;

    if (!userId || !result) {
      res.status(400).json({ message: "Faltan parámetros: userId, result" });
    }

    try {
      if (result === "win") {
        await userService.updateUserOnWin(userId);
      } else if (result === "loss") {
        await userService.updateUserOnLoss(userId);
      } else {
        res
          .status(400)
          .json({ message: "Resultado inválido. Use 'win' o 'loss'." });
      }

      res.status(200).json({ message: "Resultado registrado correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registrando el resultado", error });
    }
  },

  getUserPlayedMatches: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const matches = await userService.getUserTotalMatches(Number(id));
      matches
        ? res.status(200).json(matches)
        : res
            .status(404)
            .json({ message: "No se encontraron partidos del jugador " + id });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
  getUserWinRate: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const winrate = await userService.getUserWinRate(Number(id));
      winrate
        ? res.status(200).json(winrate)
        : res
            .status(404)
            .json({
              message: "No se ha podido calcular el winrate del jugador",
            });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};
