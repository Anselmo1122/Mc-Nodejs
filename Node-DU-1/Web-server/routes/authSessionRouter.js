import { Router } from "express";
import { nanoid } from "nanoid";
import { USERS_BBDD } from "../bbdd.js";
import authByEmailAndPwd from "../helpers/authByEmailAndPwd.js";

// Creamos nuestro router para procesos de autenticación.
const authSessionRouter = Router();

// Almacenamos las sesiones en memoria.
const sessions = [];

// Endpoint de autenticación mediante inicio de sesión.
authSessionRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailAndPwd(email, password);

    const sessionID = nanoid();
    sessions.push({ sessionID, guid });

    res.cookie("sessionID", sessionID, {
      httpOnly: true,
    })

    return res.send();
  } catch (error) {
    return res.sendStatus(401);
  }
});

// Solicitud autenticada con sesión para obtener el perfil del usuario.
authSessionRouter.get("/profile", (req, res) => {
  const { cookies } = req;

  if (!cookies.sessionID) return res.sendStatus(401);

  const userSession = sessions.find(
    (session) => session.sessionID === cookies.sessionID
  );

  if (!userSession) return res.sendStatus(401);

  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);

  if (!user) return res.sendStatus(401);

  delete user.password;

  return res.send(user);
});

export default authSessionRouter;
