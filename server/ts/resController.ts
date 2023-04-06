import express, { Request, Response } from "express";
import openDb from "./database";
import { QueryResult } from "pg";

// Retrieves all the restaurants in the database
const getAllRestaurants = (req: Request, res: Response) => {
  // Connect to the database
  let pool = openDb();

  // Query the database to retrieve all the restaurants
  pool.query(
    "select * from restaurants",
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
}

// Adds a new restaurant to the database
const addNewRestaurant = (req: Request, res: Response) => {
  let pool = openDb();

  pool.query(
    "insert into restaurants (name, phone_number, street_name, street_number, city, zip_code) values ($1, $2, $3, $4, $5, $6) returning *",
    [req.body.description],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json({ id: result.rows[0].id });
    }
  );
}

// Update an existing restaurant's name in the database
const updateRestaurant = (req: Request, res: Response) => {
  let pool = openDb();

  let id = req.params.id;
  let description = req.body.description;

  pool.query(
    "update restaurants set name = $1 where id= $2 returning *",
    [description, id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json({ id: result.rows[0].id });
    }
  );
}

// Delete an existing restaurant from the database
const deleteRestaurant = async (req: Request, res: Response) => {
  let pool = openDb();
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
}

// Export all the functions as an object to be imported by other modules
export default { getAllRestaurants, addNewRestaurant, updateRestaurant, deleteRestaurant};