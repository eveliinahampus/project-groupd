import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { pool } from "../db_connect";
import { QueryResult } from "pg";

// Retrieves all the restaurants in the database
const getAllRestaurants = async (req: Request, res: Response) => {
  // const sql = "select * from restaurants"
  const sql = "SELECT r.*, (SELECT AVG(stars)::numeric(10,1) FROM reviews WHERE restaurant_id = r.id) AS average_stars, (SELECT json_agg(reviews) FROM reviews WHERE reviews.restaurant_id = r.id) AS reviews FROM restaurants r;"

  // Query the database to retrieve all the restaurants
  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      // Handle errors and return an error response
      res.status(500).json({ err: err.message });
      return;
    }
    // Return the retrieved restaurants as a success response
    res.status(200).json(result.rows);
  });
};

// Retrieves restaurant by given id
const getRestaurantById = async (req: Request, res: Response) => {
  const sql = "SELECT r.*, (SELECT AVG(stars)::numeric(10,1) FROM reviews WHERE restaurant_id = r.id) AS average_stars, (SELECT json_agg(reviews) FROM reviews WHERE reviews.restaurant_id = r.id) AS reviews FROM restaurants r WHERE r.id = $1;"
  let id = parseInt(req.params.id);

  // Query the database to retrieve all the restaurants
  pool.query(
    sql,
    [id],
    (err: Error, result: QueryResult) => {
      if (err) {
        // Handle errors and return an error response
        res.status(500).json({ err: err.message });
        return;
      }
      // Return the retrieved restaurants as a success response
      res.status(200).json(result.rows);
    }
  );
};


// Adds a new restaurant to the database
const createRestaurant = async (req: Request, res: Response) => {
  const {  email, name, phone, address, city, zip_code } = req.body;
  const username = req.body.username
  console.log(req.body);
  const file = req.files?.image as UploadedFile

  if (!file) {
    try {
      const sql = `insert into restaurants (restaurant_name, phone_number, street_address, city, zip_code) values ($1, $2, $3, $4, $5) returning *`
      const result = await (pool.query(
        sql,
        [name,phone,address,city,zip_code]))
        res.status(200).json(result.rows)
    } catch (err: any) {
      return res.status(500).json({ err: err.message })
    }
  } else {
      // Handle file upload
      // Generate a unique filename for the uploaded image
      const fileTitle: string = file.name
      const name: string = `${Date.now()}-${file.name}`
      const uploadPath: string = `./public/images/restaurants/${name}`

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

        // Insert the restaurant with image_id record into the database
        const restaurantSql = "insert into restaurants (restaurant_name, phone_number, street_address, city, zip_code, user_id, images_id) values ($1,$2,$3,$4,$5,$6,$7) returning *"
        const result = await pool.query(restaurantSql, [name, phone, address, city, zip_code, userId, imageId])
        res.status(200).json(result.rows)
      
      } catch (err: any) {
        return res.status(500).json({ err: err.message });
      }
  }



  // pool.query(
  //   ",
  //   [name, phone, address, city, zip_code],
  //   (err: Error, result: QueryResult) => {
  //     if (err) {
  //       res.status(500).json({ err: err.message });
  //       console.log(req.body);
        
  //       return;
  //     }
  //     res.status(200).json({ id: result.rows[0].id });
  //   }
  // );
};

// Update an existing restaurant's infomation in the database
const updateRestaurant = async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);
  let { name,phone_number,street_address,city,zip_code } = req.body;

  pool.query(
    "update restaurants set restaurant_name = $1, phone_number = $2, street_address = $3, city = $4, zip_code = $5 where id= $2 returning *",
    [name,phone_number,street_address,city,zip_code,id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json({ id: result.rows[0].id });
    }
  );
};

// Delete an existing restaurant from the database
const deleteRestaurant = async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);

  pool.query(
    "delete from restaurants where id = $1",
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

// Export all the functions as an object to be imported by other modules
export default {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
