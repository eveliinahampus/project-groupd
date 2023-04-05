import express, { Request, Response } from "express";
import openDb from "./database";
import { QueryResult } from "pg";

// Create a new router object
const router = express.Router();

// Define routes
router
  .get("/", (req: Request, res: Response) => {
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
  .post("/new", (req: Request, res: Response) => {
    let pool = openDb();

    pool.query(
      "insert into restaurants (name, address...description) values ($1, $2, ...) returning *",
      [req.body.description],
      (error: Error, result: QueryResult) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
      }
    );
  })
  .delete("/delete/:id", async (req: Request, res: Response) => {
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
  })
  .put("/update/name/:id", (req: Request, res: Response) => {
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
  });

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

router
  .get("/restaurant/stars-avg/:id", (req: Request, res: Response) => {
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

export default router;
