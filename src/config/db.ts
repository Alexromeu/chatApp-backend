import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

export const sequelize = new Sequelize(
  db_name!,
  db_user!,
  db_password!,
  {
    host: db_host,
    port: Number(db_port) || 5432,
    dialect: "postgres",
    logging: true
  }
);
