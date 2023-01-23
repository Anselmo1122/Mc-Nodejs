const suma = (numA, numB) => numA + numB
const resta = (numA, numB) => numA - numB
const multiplicacion = (numA, numB) => numA * numB

// El objeto module
/*
    Si queremos exportar algo en CommonJS debemos asignarlo como 
    valor a la propiedad "exports" del objeto "module".
*/
// console.log(module)

// Exportando operaciones con CommonJS
// module.exports = { 
//     suma, 
//     resta,
//     multiplicacion
// }

// Para exportar podemos usar solo "exports" pero no es recomendable.

// Exportando operaciones con ESModules
export { suma, resta, multiplicacion };

