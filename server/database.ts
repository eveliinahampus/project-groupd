// Import required package
import { Pool } from "pg";

// Set up connection to the database
export const openDb = (): Pool => {
    const pool: Pool = new Pool ({
      user: "postgres",
      host: "localhost",
      database: "rr_db",
      password: "1234",
      port: 5432
      // user: "root",
      // host: "dpg-cggp5tu4daddcg550ivg-a.frankfurt-postgres.render.com",
      // database: "todo_aiux",
      // password: "Dp7lxWkQlr9Z1PXdojZIyuf8Q1Br3d57",
      // port: 5432,
      // ssl: true
    })
    return pool
  }
