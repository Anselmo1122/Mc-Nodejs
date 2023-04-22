import express, { Application } from "express";

import cors from "cors";

import usersRoutes from "../routes/users";

import db from "../database/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";

    // Initial methods
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database connected");
    } catch (error) {
      throw new Error("Error in database connection");
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.users, usersRoutes)
  }

  listen() {
    this.app.listen(this.port, (): void => {
      console.log("Server running on the port " + this.port);
    })
  }
}

export default Server;