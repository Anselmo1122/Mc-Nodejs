
// Global vs Window

console.log("Hola");

// Objeto Global en NodeJS

console.log(global)
console.log(process)
console.log(process.env)

console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

console.log("----------- Variables Globales -----------");

var miValor = 151453;
console.log(global.miValor);

global.miValor = miValor
console.log(`Estoy en "global.js" y mi variable es: ${global.miValor}`);


console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
console.log("----------- CommonJS -----------");

console.log(__filename);
console.log(__dirname);

const { suma } = require("./suma");
console.log(suma(100,3))

// Cortamos el proceso.
process.exit();
console.log("Adiós")

