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

// const createReview =

// const updateReview =

// const deleteReview =

export default { getAllReviews, getAverage };
