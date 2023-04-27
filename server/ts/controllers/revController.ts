import { Request, Response } from "express";
import openDb from "../db_connect";
import { QueryResult } from "pg";

const getAllReviews = async (req: Request, res: Response) => {
  let pool = openDb();

  pool.query("select * from reviews", (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ err: err.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

// Retrieves review by given id
const getReviewById = async (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id);

  pool.query(
    "select * from reviews where id = $1",
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

const createReview = async (req: Request, res: Response) => {
  let pool = openDb();

  let title = req.body.review_title
  let body = req.body.review_body
  let parsedStars = parseInt(req.body.stars);
  let parsedRestaurant_id = parseInt(req.body.restaurant_id);
  let parsedUsername = req.body.username;
  const sql = "insert into reviews (review_title,review_body,stars,restaurant_id,username) values ($1,$2,$3,$4,$5) returning *"
  
  pool.query(
    sql,
    [title, body, parsedStars, parsedRestaurant_id, parsedUsername],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
};

const updateReview = async (req: Request, res: Response) => {
  let pool = openDb();

  let title = req.body.review_title
  let body = req.body.review_body
  let parsedStars = parseInt(req.body.stars);
  let parsedRestaurant_id = parseInt(req.body.restaurant_id);
  let parsedUsername = req.body.username;

  pool.query(
    "update reviews set review_title = $1, review_body = $2, stars = $3, restaurant_id = $4, username = $5 where username = $5 and restaurant_id = $4 returning *",
    [title, body, parsedStars, parsedRestaurant_id, parsedUsername],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
};

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
};

export default {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
