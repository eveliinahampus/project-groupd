import express, { Request, Response } from "express";
import openDb from "../database";
import { QueryResult } from "pg";

const getAllImages = (req: Request, res: Response) => {
  const pool = openDb();
  pool.query("select * from img", (err: Error, result: QueryResult) => {
    if (err) {
      //res.statusMessage = err.message
      res.status(500).json({ err: err.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

const createImage = (req: Request, res: Response) => {
  let pool = openDb();

  pool.query(
    "insert into images (title, name) values ($1, $2) returning *",
    [req.body.description],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json({ id: result.rows[0].id });
    }
  );
};

const updateImage = (req: Request, res: Response) => {
  let pool = openDb();

  let id = parseInt(req.params.id);
  let description = req.body.description;

  pool.query(
    "update images set name = $1 where id= $2 returning *",
    [description, id],
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

export default { getAllImages, createImage, updateImage, deleteImage };
