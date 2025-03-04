//APP MANEJA LA CONFIGURACION INICIAL DE EXPRESS
//Maneja tambien middlewares y rutas

import express from "express";
import cors from "cors";
import routes from "./routes/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes); //RUTAS DE LA API

export default app;
