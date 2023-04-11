import { Request, Response } from "express";
import openDb from "../db_connect";
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

// Retrieves review by given id
const getReviewById = (req: Request, res: Response) => {
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

const getAverageStars = (req: Request, res: Response) => {
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
  let title = req.body.titel
  let body = req.body.body
  let parsedStars = parseInt(req.body.stars);
  let parsedRestaurant_id = parseInt(req.body.restaurant_id);
  let parsedUser_id = parseInt(req.body.user_id);

  pool.query(
    "insert into reviews (title,body,stars,restaurant_id,user_id) values ($1,$2,$3,$4.$5) returning *",
    [title, body, parsedStars, parsedRestaurant_id, parsedUser_id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
};

const updateReview = (req: Request, res: Response) => {
  let pool = openDb();
  let title = req.body.titel
  let body = req.body.body
  let userId = parseInt(req.params.userId)
  let restaurantId = parseInt(req.params.restaurantId)
  let parsedStars = parseInt(req.body.stars);

  pool.query(
    "update reviews set title = $1, body = $2, stars = $3 where user_id = $4 and restaurant_id = %5 returning *",
    [title, body, parsedStars, userId, restaurantId],
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
  getAverageStars,
  createReview,
  updateReview,
  deleteReview,
};
