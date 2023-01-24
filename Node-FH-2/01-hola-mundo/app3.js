console.log("Inicio del programa.");

// Un "setTimeOut" es una sentencia no bloqueante.
// Los "console.log" son instrucciones síncronas.

setTimeout(() => {
    console.log("Primer Timeout")
}, 3000);

setTimeout(() => {
    console.log("Segundo Timeout")
}, 0);

setTimeout(() => {
    console.log("Tercer Timeout")
}, 0);

/*
    Los "setTimeOut" se almacenan en una pila de llamadas
    o Call Stack para su posterior ejecución.
*/

console.log("Fin del programa.")