import { Client, type Knex } from "knex";
import 'dotenv/config';

if (!process.env.CONNECT) {
  throw new Error('Database connection string is not defined in environment variables');
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.CONNECT,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations"
    },
    seeds: {
      directory: "./src/db/seeds"
    },
    
  },

  test: {
    client: "pg",
    connection: process.env.CONNECT,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/db/migrations"
    },
    seeds: {
      directory: "./src/db/seeds"
    },
    
  }
};

export default config;