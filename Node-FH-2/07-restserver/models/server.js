const express = require("express");
const cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Routes paths
		this.userPath = "/api/user";

		// Middlewares
		this.middlewares();

		// Rutas de mi aplicación
		this.routes();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

		// Directorio público
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.userPath, require("../routes/user.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor escuchando en el puerto", this.port);
		});
	}
}

module.exports = Server;
