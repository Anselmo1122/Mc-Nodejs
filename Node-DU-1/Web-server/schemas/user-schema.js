import mongoose from "mongoose";

/*
    Un esquema es la forma en la que queremos representar
    nuestros datos en la bd.
    Deberemos crear un esquema por cada entidad que queramos almacenar.
*/

// Definimos el esquema de nuestro usuario.
/*
    Por defecto la base de datos nos genera un "_id"
    en este caso lo sobreescribiremos para poder colocar
    nuestro propio id.
*/
const userSchema = mongoose.Schema({
    _id: String,
    name: String
})

/*
    userModel es un objeto que cuenta con un conjunto de métodos 
    que permiten interactuar con la colección de usuarios.
*/ 
const userModel = mongoose.model("User", userSchema)

export default userModel;
