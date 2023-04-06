import express, { Request, Response } from "express";
import openDb from "./database";
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
  }

export default { getAllImages };