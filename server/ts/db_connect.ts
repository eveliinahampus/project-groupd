// Import required package
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set up connection to the database
const openDb = (): Pool => {
  const pool: Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });
  return pool;
};

export default openDb;
