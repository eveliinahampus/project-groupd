import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { pool } from "../db_connect";
import { QueryResult } from "pg";

const getAllReviews = async (req: Request, res: Response) => {
  
  const sql = `select review_title,review_body,stars,created_at,
  (select restaurant_name from restaurants where reviews.restaurant_id = restaurants.id) as restaurant_name,
  (select img_name from images where reviews.images_id = images.id) as image_name
  from reviews`

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ err: err.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

// Retrieves review by given id
const getReviewById = async (req: Request, res: Response) => {
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
  const title = req.body.review_title
  const body = req.body.review_body.replace(/[\r\n]/g," ")
  const parsedStars = parseInt(req.body.stars);
  const parsedRestaurant_id = parseInt(req.body.restaurant_id);
  const username = req.body.username;
  
  const file = req.files?.image as UploadedFile

  if (!file) {
    try {
      // Get user id fro given username
      const userIdResult = await pool.query(
        "select id from users where username = $1",
        [username]
      );
    const userId = parseInt(userIdResult.rows[0].id)

    const sql = "insert into reviews (review_title,review_body,stars,restaurant_id,user_id) values ($1,$2,$3,$4,$5) returning *"
    const result = await (pool.query(
      sql,
      [title, body, parsedStars, parsedRestaurant_id, userId]))
      res.status(200).json(result.rows)
    } catch (err: any) {
      return res.status(500).json({ err: err.message })
    }
  } else {
    // Handle file upload
    // Generate a unique filename for the uploaded image
    const fileTitle: string = file.name
    const name: string = `${Date.now()}-${file.name}`
    const uploadPath: string = `./public/images/reviews/${name}`

    try {
      await file.mv(uploadPath)

      // Get user id fro given username
      const userIdResult = await pool.query(
          "select id from users where username = $1",
          [username]
        );
      const userId = userIdResult.rows[0].id;

      // Insert the image record into the database
      const imageIdResult = await pool.query(
        "INSERT INTO images (img_title, img_name, user_id) VALUES ($1, $2, $3) RETURNING id",
        [fileTitle, name, userId]
      );
      const imageId = imageIdResult.rows[0].id;

      // Insert the review with image_id record into the database
      const reviewSql = "insert into reviews (review_title,review_body,stars,restaurant_id,username,images_id) values ($1,$2,$3,$4,$5,$6) returning *"
      const result = await pool.query(reviewSql,[title, body, parsedStars, parsedRestaurant_id, username, imageId])
      res.status(200).json(result.rows)
    
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  }
}
  

const updateReview = async (req: Request, res: Response) => {
  let title = req.body.review_title
  let body = req.body.review_body
  let parsedStars = parseInt(req.body.stars);
  let parsedRestaurant_id = parseInt(req.body.restaurant_id);
  let parsedUsername = req.body.username;

  await pool.query(
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
