import Server from "./models/server.class";
import dotenv from "dotenv";

dotenv.config()

const server: Server = new Server();

server.listen();

