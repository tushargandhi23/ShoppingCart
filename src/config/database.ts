import { Sequelize } from "sequelize";

export const database = new Sequelize(
  "firstPG","postgres", "test123",{
    port: 5432,
    host: "localhost",
    dialect: "postgres",
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
  },
});