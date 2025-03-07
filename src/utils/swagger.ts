import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Beex 2025 API",
      version: "1.0.0",
      description: "API para gestión de jugadores y matchmaking",
      basePath: "/api",
    },
    servers: [{ url: "http://localhost:3000", description: "Entorno local" }],
    components: {
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del usuario.",
            },
            nombre: {
              type: "string",
              description: "Nombre del usuario.",
            },
            email: {
              type: "string",
              format: "email",
              description: "Correo electrónico único del usuario.",
            },
            fechaNacimiento: {
              type: "date",
              format: "date-time",
              description: "Fecha de nacimiento del usuario (opcional).",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora de creación del usuario.",
            },
            telefono: {
              type: "string",
              description: "Número de teléfono del usuario (opcional).",
            },
            latitud: {
              type: "number",
              format: "decimal",
              description: "Latitud de la ubicación del usuario.",
            },
            longitud: {
              type: "number",
              format: "decimal",
              description: "Longitud de la ubicación del usuario.",
            },
            partidasJugadas: {
              type: "integer",
              description: "Número de partidas jugadas por el usuario.",
            },
            partidasGanadas: {
              type: "integer",
              description: "Número de partidas ganadas por el usuario.",
            },
            partidasPerdidas: {
              type: "integer",
              description: "Número de partidas perdidas por el usuario.",
            },
            ranking: {
              type: "string",
              description:
                'Nivel de ranking del usuario (por defecto "bronce") | plata | oro.',
              default: "bronce",
            },
          },
        },
        Match: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único de la partida.",
            },
            player1Id: {
              type: "integer",
              description: "ID del primer jugador.",
            },
            player2Id: {
              type: "integer",
              nullable: true,
              description: "ID del segundo jugador (opcional).",
            },
            player3Id: {
              type: "integer",
              nullable: true,
              description: "ID del tercer jugador (opcional).",
            },
            player4Id: {
              type: "integer",
              nullable: true,
              description: "ID del cuarto jugador (opcional).",
            },
            status: {
              type: "string",
              description:
                'Estado de la partida (por defecto "en espera") | "activa".',
              default: "en espera",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora de creación de la partida.",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
