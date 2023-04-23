const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const clientPath = path.resolve(__dirname, '../client');
const port = process.env.PORT || 3000;

app.use(express.static(clientPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Server running in the port ${ port }`);
});