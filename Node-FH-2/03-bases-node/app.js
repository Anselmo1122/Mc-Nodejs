// Importamos "crearArchivo()".
const { crearArchivo } = require("./helpers/multiplicar");

// Utilizamos "Yargs" en nuestra aplicación de comandos.
const argv = require("./config/yargs");

console.clear();


// Obteniendo información desde línea de comando.

// "Yargs" transforma la información en un objeto.
// console.log(argv);


// No es buena idea hacerlo de esta forma.
// const [ , , arg3 = "--base=5" ] = process.argv;
// const [ , base ] = arg3.split("=");


// Llamamos y ejecutamos la función importada.

crearArchivo(argv.b, argv.h, argv.l)
    .then((nombreArchivo) => console.log(`     ${nombreArchivo}`, "\n creado correctamente."))
    .catch((err) => console.log(err))

// Nuestra función retorna una "promesa", por lo que debemos manejarla con un ".then()" y ".catch()";

