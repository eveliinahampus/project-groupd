import express, { Request, Response } from "express";
import openDb from "./database";
import { QueryResult } from "pg";

// Create a new router object
const router = express.Router();

// Define routes for restaurants
router
  .get("/restaurants", (req: Request, res: Response) => {
    let pool = openDb();

    pool.query(
      "select * from restaurants",
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
      }
    );
  })
  .post("/restaurants/new", (req: Request, res: Response) => {
    let pool = openDb();

    pool.query(
      "insert into restaurants (name, phone_number, street_name, street_number, city, zip_code) values ($1, $2, $3, $4, $5, $6) returning *",
      [req.body.description],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
      }
    );
  })
  .put("/restaurants/update/name/:id", (req: Request, res: Response) => {
    let pool = openDb();

    let id = req.params.id;
    let description = req.body.description;

    pool.query(
      "update restaurants set name = $1 where id= $2 returning *",
      [description, id],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
      }
    );
  })
  .delete("/restaurants/delete/:id", async (req: Request, res: Response) => {
    let pool = openDb();
    let id = parseInt(req.params.id);

    pool.query(
      "delete from restaurants where id = $1",
      [id],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: id });
      }
    );
  });

// Define routes for users
router
  .get("/users", (req: Request, res: Response) => {
    let pool = openDb();

    pool.query(
      "select * from users",
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
      }
    );
  })
  .post("/users/new", (req: Request, res: Response) => {
    let pool = openDb();

    pool.query(
      "insert into users (username, email, password) values ($1, $2, $3) returning *",
      [req.body.description],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
      }
    );
  })
  .put("/users/update/name/:id", (req: Request, res: Response) => {
    let pool = openDb();

    let id = req.params.id;
    let description = req.body.description;

    pool.query(
      "update users set name = $1 where id= $2 returning *",
      [description, id],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
      }
    );
  })
  .delete("/users/delete/:id", async (req: Request, res: Response) => {
    let pool = openDb();
    let id = parseInt(req.params.id);

    pool.query(
      "delete from restaurants where id = $1",
      [id],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: id });
      }
    );
  });

// Define routes for reviews
router
  .get("/reviews", (req: Request, res: Response) => {
    let pool = openDb();

    pool.query(
      "select * from reviews",
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
      }
    );
  })
  .get("/reviews/stars-avg/:id", (req: Request, res: Response) => {
    let pool = openDb();
    let id = parseInt(req.params.id)

    pool.query(
      "select avg(stars)::numeric(10,2) from reviews where restaurant_id = $1",
      [id],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
      }
    );
  })

export default router;
