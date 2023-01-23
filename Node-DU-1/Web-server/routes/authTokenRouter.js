import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
import authByEmailAndPwd from "../helpers/authByEmailAndPwd.js";
import { jwtVerify, SignJWT } from "jose";
import validateLoginDTO from "../validations/validateLoginDTO.js";

// Creamos nuestro router para procesos de autenticación.
const authTokenRouter = Router();

// Endpoint de autenticación mediante "email" y "password".

/*
  Podemos definir middlewares como parámetros del endpoint, en este caso
  crearemos un middleware para validar el DTO pasado en la ruta "/login".
*/
authTokenRouter.post("/login", validateLoginDTO, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailAndPwd(email, password);

    // Generar y devolver el token.

    const jwtConstructor = new SignJWT({ guid });

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (error) {
    return res.send(error);
  }
});

// Solicitud autenticada con token para obtener el perfil del usuario.
authTokenRouter.get("/profile", async (req, res) => {

  // Obtener token de la cabecera y comprobar su autenticidad y caducidad.
  const { authorization } = req.headers;

  if(!authorization) return res.sendStatus(401)

  try {
    const encoder = new TextEncoder();

    // Función para verificar validez del token.
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    
    const user = USERS_BBDD.find((user) => user.guid === payload.guid);

    if (!user) return res.sendStatus(401);

    delete user.password;

    return res.send(user);
  } catch(error) {
    return res.sendStatus(401)
  }
});

export default authTokenRouter;
