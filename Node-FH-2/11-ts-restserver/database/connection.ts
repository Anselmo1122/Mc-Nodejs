import { Sequelize } from "sequelize";

const db = new Sequelize("curso-node", "root", undefined, {
  host: "localhost",
  dialect: "mariadb",
  // logging: false
})

export default db;