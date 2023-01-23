
// --------------------- Servidor con "http"

// import { createServer } from "http";

// const httpServer = createServer((req, res)=>{
//     console.log("Solicitud recibida");

//     console.log(req.method);
//     console.log(req.url);
//     console.log(req.headers);

//     let data = ""
//     let chunkIndex = 0
//     req.on("data", (chunk) => {
//         data += chunk;
//         chunkIndex++;
//         console.log(chunkIndex);
//     })

//     req.on("end", () => {
//         console.log(data)
//         res.end("Te he enviado la respuesta");
//     })
// })

// httpServer.listen(3000)


// --------------------- Servidor con "express"

// import express, { json } from "express";

// const port = 3000;
// const expressServer = express();

// /* 
// 	Un Middleware es una función que se ejecuta para 
// 	múltiples endpoints antes de su ejecución.
// */

// // Middleware que hace un parseo del body formato json.
// expressServer.use(express.json());

// // Middleware que hace un parseo del body formato txt.
// expressServer.use(express.text());

// expressServer.get("/mi-cuenta/:id", (req, res) => {
//     console.log(`Parámetro de url: ${req.params.id}`)
//     console.log(req.headers)
//     console.log(`Valor de cabecera "host": ${req.get('host')}`)

//     res.send("Tu cuenta personal.")
//     // res.status(401).send({
//     //     errorMessage: "No autorizado",
//     // })
// })

// expressServer.post("/producto", (req, res) => {
//     req.body.id
//         ? req.body = {id: `${req.body.id} verified`}
//         : req.body = "He usado tu texto mi querido cliente."

//     console.log(req.body);

//     res.send();
// })

// expressServer.listen(port, () => {
//     console.log(`Servidor desplegado en el puerto ${port}`);
// })


// --------------------- Api de cuentas

import express, { json } from "express";
import dotenv from "dotenv";
import accountRouter from "./routes/account.js"
import authRouter from "./routes/auth.js";
import authSessionRouter from "./routes/authSessionRouter.js";
import authTokenRouter from "./routes/authTokenRouter.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;

const expressServer = express();

expressServer.use(cookieParser());
expressServer.use(express.json());
expressServer.use(express.text());

/*
    Si no especificamos una dirección para nuestras
    rutas, por defecto esta iniciará desde la raíz y
    eso puede ocasionar conflictos.
*/

expressServer.use("/account", accountRouter);
expressServer.use("/auth", authRouter);

/*
    Rutas para autenticación por sesión y por token.
*/

expressServer.use("/auth-session", authSessionRouter);
expressServer.use("/auth-token", authTokenRouter);

expressServer.get("/product", (req, res) => {
    res.send()
})

const bootstrap = async () => {

    // Método de "mongoose" para conectar con la base de datos.
    // Esta debe ejecutarse antes del "listen".
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DB_URL)

    expressServer.listen(PORT, () => {
        console.log(`Servidor desplegado en el puerto ${PORT}`);
    })
}

bootstrap();
