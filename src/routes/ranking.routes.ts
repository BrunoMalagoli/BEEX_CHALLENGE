import { Router } from "express";
import { RankingController } from "../controllers/ranking.controller";
const rankingRoutes = Router();

rankingRoutes.get("/:rank", RankingController.getUsersByRanking);
rankingRoutes.patch("/:id", RankingController.updateUserRank);
export default rankingRoutes;

/**
 * @swagger
 * /ranking/{rank}:
 *   get:
 *     summary: Obtiene todos los usuarios del rango indicado
 *     tags: [Ranking]
 *     responses:
 *      200:
 *         description: Lista de usuarios por rango obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     description: Email del usuario
 *                   fechaNacimiento:
 *                     type: string
 *                     format: date
 *                     description: Fecha de nacimiento
 *                   telefono:
 *                     type: string
 *                     description: Teléfono del usuario
 *                   longitud:
 *                     type: number
 *                     format: decimal
 *                     description: Longitud geográfica
 *                   latitud:
 *                     type: number
 *                     format: decimal
 *                     description: Latitud geográfica
 *                   ranking:
 *                     type: string
 *                     description: Rango del jugador
 *      404:
 *         description: No se encontraron jugadores del rango indicado, por favor prueba bronce | plata | oro
 *      500:
 *        description: Error del servidor
 */

/**
 * @swagger
 * /ranking/{id}:
 *   patch:
 *     summary: Actualiza el rango de un jugador si cumple las condiciones necesarias
 *     tags: [Ranking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         Description: Rango actualizado
 *       500:
 *         description: No se ha alcanzado el nivel suficiente para subir de rango
 */
