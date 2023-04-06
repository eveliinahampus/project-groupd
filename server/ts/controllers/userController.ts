import express, { Request, Response } from "express";
import openDb from "../database";
import { QueryResult } from "pg";

const getAllUsers = (req: Request, res: Response) => {
  let pool = openDb();

  pool.query("select * from users", (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ err: err.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

const createUser = (req: Request, res: Response) => {
  let pool = openDb();

  pool.query(
    "insert into users (username, email, password) values ($1, $2, $3) returning *",
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

const updateUser = (req: Request, res: Response) => {
  let pool = openDb();

  let id = req.params.id;
  let description = req.body.description;

  pool.query(
    "update users set name = $1 where id= $2 returning *",
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

const deleteUser = async (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id);

  pool.query(
    "delete from users where id = $1",
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

export default { getAllUsers, createUser, updateUser, deleteUser };
