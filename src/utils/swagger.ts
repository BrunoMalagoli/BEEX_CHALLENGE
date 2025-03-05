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
    },
    servers: [{ url: "http://localhost:3000", description: "Entorno local" }],
    components: {
      schemas: {
        Player: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            ranking: { type: "number" },
            location: {
              type: "object",
              properties: {
                lat: { type: "number" },
                lon: { type: "number" },
              },
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
