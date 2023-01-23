import { Router } from "express";
import { USERS_BBDD } from "../bbdd.js";
import userModel from "../schemas/user-schema.js";

// Creamos nuestra ruta.
const accountRouter = Router();

accountRouter.use((req, res, next) => {
    console.log(req.ip);
    /*
        next representa a la siguiente función a ejecutar, puede ser la 
        la función correspondiente a la request o el siguiente middleware.
    */
    next()
})

// Obtener los detalles de una cuenta a partir de guid.
accountRouter.get("/:guid", async (req, res) => {

    let { guid } = req.params;
    // Práctica con base de datos falsa.
    // let user = USERS_BBDD.find((user) => user.guid === guid)

    // Práctica con base de datos real.
    const user = await userModel.findById(guid).exec();

    if (!user) return res.status(404).send()
    return res.send(user)

})

// Crear una cuenta nueva.
accountRouter.post("/", async (req, res) => {
    
    // Práctica con base de datos falsa.
    // let user = USERS_BBDD.find((user) => user.guid === req.body.guid)

    // Práctica con base de datos real.
    const user = await userModel.findById(req.body.guid).exec();

    const newUser = new userModel({_id: req.body.guid, name: req.body.name});

    if (user) return res.status(409).send()
    else await newUser.save()
    // else USERS_BBDD.push( req.body )

    return res.send("Cuenta creada")

})

// Actualizar nombre de una cuenta a partir del guid.
accountRouter.patch("/:guid", async (req, res) => {

    let guid = req.params.guid

    // Práctica con base de datos falsa.
    // let user = USERS_BBDD.find((user) => user.guid === guid)

    // Práctica con base de datos real.
    const user = await userModel.findById(guid).exec()

    user.name = req.body.name;

    if (!user) return res.status(404).send()

    await user.save();
    return res.send(`Nombre actualizado`);

})

// Eliminar una cuenta a partir del guid..
accountRouter.delete("/:guid", async (req, res) => {

    const guid = req.params.guid
    // Práctica con base de datos falsa.
    // let user = USERS_BBDD.find((user) => user.guid === guid)
    // USERS_BBDD.splice(userIndex, 1)

    // Práctica con base da datos real.
    const user = await userModel.findByIdAndDelete(guid).exec()

    if (!user) return res.status(404).send()
    return res.send("Usuario eliminado.")

})

export default accountRouter;