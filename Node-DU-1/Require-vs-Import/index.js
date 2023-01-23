// CommonJS
// const { suma, resta, multiplicacion } = require("./operaciones")

// ESModules
import { suma, resta, multiplicacion } from "./operaciones.js";

console.log(`Suma: ${suma(145, 23)}`)
console.log(`Resta: ${resta(145, 23)}`)
console.log(`Multiplicación: ${multiplicacion(145, 23)}`)

/*
    En NodeJS podemos especificar el tipo de sistema de 
    módulos que queremos utilizar con el siguiente valor en 
    nuestro "package.json":

    "type": "commonjs" o "type": "module"

    Podemos forzar el uso de uno u otro en un archivo usando
    la extensión ".cjs" o ".mjs"
*/

/*
    CommonJS nos permite hacer uso de archivos ".json" y 
    los transforma a objetos al ser importados, con ESModules 
    no es tan sencillo hacer esto, pero si posible:
*/

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const users = require("./users.json");
// console.log(users)

// Importando con ESM podemos operar con CJS de forma sencilla.

// Importando con CJS podemos operar con ESM pero no es tan sencillo.
// import("./operaciones.mjs").then(({ suma }) => { console.log(suma(155,32)) })
