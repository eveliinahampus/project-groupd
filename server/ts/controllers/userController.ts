import { Request, Response } from "express";
import openDb from "../db_connect";
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

// Retrieves User by given id
const getUserById = (req: Request, res: Response) => {
  let pool = openDb();
  let id = parseInt(req.params.id);

  pool.query(
    "select * from users where id = $1",
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

const createUser = (req: Request, res: Response) => {
  let pool = openDb();
  let { username, email, password } = req.body;

  pool.query(
    "insert into users (username, email, password) values ($1, $2, $3) returning *",
    [username, email, password],
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

  let id = parseInt(req.params.id);
  let { name, email, password } = req.body;

  pool.query(
    "update users set name = $1, email = $2, password = $3 where id= $4 returning *",
    [name, email, password, id],
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

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
