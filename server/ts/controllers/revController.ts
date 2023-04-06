import express, { Request, Response } from "express";
import openDb from "../database";
import { QueryResult } from "pg";

const getAllReviews = (req: Request, res: Response) => {
  let pool = openDb();

  pool.query("select * from reviews", (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ err: err.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

const getAverage = (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id);

  pool.query(
    "select avg(stars)::numeric(10,2) from reviews where restaurant_id = $1",
    [id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
};

const createReview = (req: Request, res: Response) => {
  let pool = openDb();
  let stars = parseInt(req.body.stars)
  let restaurant_id = parseInt(req.body.restaurant_id)
  let user_id = parseInt(req.body.user_id)

  pool.query("insert into reviews (title,body,stars,restaurant_id,user_id) values ($1,$2,$3,$4.$5) returning *",
    [req.body.title,req.body.body,stars,restaurant_id,user_id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message})
        return;
      }
      res.status(200).json(result.rows);
    }
  );
}

const updateReview = (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id)
  // let stars = parseInt(req.body.stars)
  // let restaurant_id = parseInt(req.body.restaurant_id)
  // let user_id = parseInt(req.body.user_id)

  pool.query("update reviews set title = $1  AND set body = $2 where id = $3 returning *",
    [req.body.title,req.body.body,id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message})
        return;
      }
      res.status(200).json(result.rows);
    }
  );
}

const deleteReview = async (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id);

  pool.query(
    "delete from reviews where id = $1",
    [id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json({ id: id });
    }
  );
}

export default { getAllReviews, getAverage, createReview, updateReview, deleteReview };
