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

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *      200:
 *         description: Lista de usuarios obtenida correctamente
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
 *         description: No se encontraron usuarios
 *      500:
 *        description: Error del servidor
 */

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento
 *               telefono:
 *                 type: string
 *                 description: Teléfono del usuario
 *               longitud:
 *                 type: number
 *                 format: decimal
 *                 description: Longitud geográfica
 *               latitud:
 *                 type: number
 *                 format: decimal
 *                 description: Latitud geográfica
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Email del usuario
 *                 fechaNacimiento:
 *                   type: string
 *                   format: date
 *                   description: Fecha de nacimiento
 *                 telefono:
 *                   type: string
 *                   description: Teléfono del usuario
 *                 longitud:
 *                   type: number
 *                   format: decimal
 *                   description: Longitud geográfica
 *                 latitud:
 *                   type: number
 *                   format: decimal
 *                   description: Latitud geográfica
 *       500:
 *         description: Error creando el usuario
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Email del usuario
 *                 fechaNacimiento:
 *                   type: string
 *                   format: date
 *                   description: Fecha de nacimiento
 *                 telefono:
 *                   type: string
 *                   description: Teléfono del usuario
 *                 longitud:
 *                   type: number
 *                   format: decimal
 *                   description: Longitud geográfica
 *                 latitud:
 *                   type: number
 *                   format: decimal
 *                   description: Latitud geográfica
 *                 ranking:
 *                     type: string
 *                     description: Rango del jugador
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Obtiene un usuario por email
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Email del usuario
 *                 fechaNacimiento:
 *                   type: string
 *                   format: date
 *                   description: Fecha de nacimiento
 *                 telefono:
 *                   type: string
 *                   description: Teléfono del usuario
 *                 longitud:
 *                   type: number
 *                   format: decimal
 *                   description: Longitud geográfica
 *                 latitud:
 *                   type: number
 *                   format: decimal
 *                   description: Latitud geográfica
 *                 ranking:
 *                     type: string
 *                     description: Rango del jugador
 *         404:
 *           description: Usuario no encontrado
 */

/**
 * @swagger
 * /users/profileCompletion/{id}:
 *   get:
 *     summary: Obtiene el porcentaje de perfil completado de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         content:
 *          application/json:
 *           schema:
 *            type: integer
 *            description: Porcentaje de perfil completado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /users/finishedMatch:
 *   patch:
 *     summary: Registra el resultado de una partida jugada por un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del jugador
 *               result:
 *                 type: string
 *                 description: Resultado de la partida ("win" o "loss")
 *     responses:
 *       200:
 *         description: Resultado de la partida registrado correctamente
 *       400:
 *         description: Resultado inválido. Use 'win' o 'loss'.
 *       500:
 *         description: Error registrando el resultado
 */

/**
 * @swagger
 * /users/matches/{id}:
 *   get:
 *     summary: Obtiene el número de partidas jugadas por un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         content:
 *          application/json:
 *           schema:
 *            type: integer
 *            description: Número de partidas jugadas por el jugador indicado
 *       404:
 *         description: No se encontraron partidas jugadas por userID
 *       505:
 *         description: Error al buscar partidas jugadas por el jugador
 */

/**
 * @swagger
 * /users/matches/winrate/{id}:
 *   get:
 *     summary: Obtiene el porcentaje de WinRate de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         content:
 *          application/json:
 *           schema:
 *            type: integer
 *            description: Porcentaje de winrate
 *       404:
 *          description : No se ha podido calcular el winrate del jugador
 *       500:
 *          description: Error del servidor
 *
 */

export default userRoutes;
