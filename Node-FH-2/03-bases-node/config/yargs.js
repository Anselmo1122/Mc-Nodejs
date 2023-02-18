// Obteniendo información desde línea de comando.

// Utilizamos "Yargs" en nuestra aplicación de comandos.
const argv = require("yargs")
                .option("b", { 
                    alias: "base",
                    type: "number",
                    default: 5,
                    demandOption: true,
                    describe: "Define el multiplicador"
                })
                .option("l", { 
                    alias: "listar",
                    type: "boolean",
                    default: false,
                    describe: "Hace un listado de los valores"
                })
                .option("h", { 
                    alias: "hasta",
                    type: "number",
                    default: 10,
                    describe: "Determina el número de factores"
                })
                .check((argv) => {
                    if( isNaN(argv.b) ) throw "La base tiene que ser 'number'."
                    if( typeof argv.l !== "boolean" ) throw "El valor de listar debe ser 'boolean'."
                    if( isNaN(argv.h) ) throw "El hasta tiene que ser 'number'."
                    else return true;
                })
                .argv

module.exports = argv;