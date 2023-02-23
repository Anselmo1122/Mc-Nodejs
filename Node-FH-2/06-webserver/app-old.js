
// Requiriendo nuestro paquete HTTP
const http = require("http");

// Creamos nuestro servidor.
http.createServer((req, res) => {

    // res.writeHead(200, { "Content-Type": "application/json" })
    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    res.writeHead(200, { "Content-Type": "application/csv" })
    

    // const persona = { id: 1, name: "Anselmo"};
    // res.write(JSON.stringify(persona));

    res.write( 'id, nombre\n' );
    res.write( '1, Fernando\n' );
    res.write( '2, Maria\n' );
    res.write( '3, Juan\n' );
    res.write( '4, Pedro\n' );

    res.end()

}).listen(8080)

console.log("Escuchando en el puerto ", 8080);