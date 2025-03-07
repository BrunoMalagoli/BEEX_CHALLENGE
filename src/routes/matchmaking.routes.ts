import express from "express";
import { MatchmakingController } from "../controllers/matchmaking.controller";

const matchmakingRoutes = express.Router();

matchmakingRoutes.post("/find-match", MatchmakingController.findMatch);
matchmakingRoutes.get(
  "/active-matches",
  MatchmakingController.getActiveMatches
);
/**
 * @swagger
 * /matchmaking/find-match:
 *   post:
 *     summary: Busca una partida apta para que pueda unirse el jugador. De no haberla, crea una en estado de espera hasta que se unan los jugadores necesarios.
 *     tags: [Matchmaking]
 *     responses:
 *       200:
 *         description: Partida lista
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la partida
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la partida
 *                 player1Id:
 *                   type: number
 *                   description: ID del jugador número 1
 *                 player2Id:
 *                   type: number
 *                   description: ID del jugador número 2
 *                 player3Id:
 *                   type: number
 *                   description: ID del jugador número 3
 *                 player4Id:
 *                   type: number
 *                   description: ID del jugador número 4
 *                 status:
 *                   type: string
 *                   description: Estado de la partida
 *       202:
 *         description: Jugador unido correctamente , faltan x Jugador(es)
 *       400:
 *         description: Falta el parametro userId
 *       404:
 *         description: No se encontraro partida
 *       500:
 *         description: Error del servidor
 */
/**
 * @swagger
 * /matchmaking/active-matches:
 *   get:
 *     summary: Obtiene partidas con estado activo
 *     tags: [Matchmaking]
 *     responses:
 *       200:
 *         description: Lista de partidas activas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la partida
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación de la partida
 *                   player1Id:
 *                     type: number
 *                     description: ID del jugador número 1
 *                   player2Id:
 *                     type: number
 *                     description: ID del jugador número 2
 *                   player3Id:
 *                     type: number
 *                     description: ID del jugador número 3
 *                   player4Id:
 *                     type: number
 *                     description: ID del jugador número 4
 *                   status:
 *                     type: string
 *                     description: Estado de la partida
 *       400:
 *         description: Error al buscar partidas activas
 *       500:
 *         description: Error del servidor
 */
export default matchmakingRoutes;
