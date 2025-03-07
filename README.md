
# BEEX_CHALLENGE

Desafío técnico Beex 2025




## Stack Tecnológico

**NodeJs** +
**TypeScript** +
**PostgreSQL** +
**PrismaORM**



## Otras herramientas utilizadas

 - Postman
 - Swagger
 - Docker


## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

```bash
  git clone https://github.com/BrunoMalagoli/BEEX_CHALLENGE
  cd BEEX-CHALLENGE
  npm install
```

Configura la base de datos:

Crea una base de datos PostgreSQL.

Configura las credenciales en el archivo .env:
```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos"
```
Ejecuta las migraciones de Prisma:
```
npx prisma migrate dev --name init
```

Inicia el servidor:
```
npm run dev
```

**Prisma Studio: Para visualizar y manipular la base de datos, ejecuta:**
```
npx prisma studio

```


**Documentación de la API**

La documentación de la API está disponible usando Swagger. Para acceder a ella:

Inicia el servidor.

Visita http://localhost:3000/api-docs en tu navegador.

**Pruebas**

Puedes probar los endpoints usando Postman:

Importa la colección de Postman desde el archivo Beex_Backend_Challenge.postman_collection.json.

Configura el entorno en Postman con la URL base: http://localhost:3000/api/.


    