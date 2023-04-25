import { Request, Response } from "express";
import openDb from "../db_connect";
import { QueryResult } from "pg";

const getAllImages = async (req: Request, res: Response) => {
  let pool = openDb();

  pool.query("select * from images", (err: Error, result: QueryResult) => {
    if (err) {
      res.statusMessage = err.message;
      res.status(500).json({ err: err.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

// Retrieves image by given id
const getImageById = async (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id);

  pool.query(
    "select * from images where id = $1",
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

const createImage = async (req: Request, res: Response) => {
  let pool = openDb();
  let { name, title } = req.body;

  pool.query(
    "insert into images (img_title, img_name) values ($1, $2) returning *",
    [name, title],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json({ id: result.rows[0].id });
    }
  );
};

const updateImage = async (req: Request, res: Response) => {
  let pool = openDb();

  let id = parseInt(req.params.id);
  let { name, title } = req.body;

  pool.query(
    "update images set img_name = $1 and set img_title= $2 where id= $3 returning *",
    [name, title, id],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json({ id: result.rows[0].id });
    }
  );
};

const deleteImage = async (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id);

  pool.query(
    "delete from images where id = $1",
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
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
};
