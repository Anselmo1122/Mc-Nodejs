import { Router } from "express";
import authByEmailAndPwd from "../helpers/authByEmailAndPwd.js";

// Creamos nuestro router para procesos de autenticación.
const authRouter = Router();

// Endpoint de acceso público.
authRouter.get("/publico", (req, res) => {
  return res.send("Ruta de acceso público.");
});

// Endpoint de autenticación mediante "email" y "password".
authRouter.post("/autenticado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailAndPwd(email, password);

    return res.send(`Usuario "${user.name}" autenticado.`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

// Endpoint de autorización en caso de ser "admin".
authRouter.post("/autorizado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailAndPwd(email, password);

    if (user.role !== "admin") return res.sendStatus(403);

    return res.send(
      `Usuario "${user.name}" está autorizado ya que es "${user.role}".`
    );
  } catch (error) {
    return res.sendStatus(401);
  }
});

export default authRouter;
