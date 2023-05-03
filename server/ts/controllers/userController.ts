import { Request, Response } from "express";
import { pool } from "../db_connect";
import { QueryResult } from "pg";

const getAllUsers = async (req: Request, res: Response) => {

  const sql = "SELECT u.*, (SELECT json_agg(reviews) FROM reviews WHERE reviews.user_id = u.id) AS reviews FROM users u;"

  pool.query(sql, (err: Error, result: QueryResult) => {
    if (err) {
      res.status(500).json({ err: err.message });
      return;
    }
    res.status(200).json(result.rows);
  });
};

// Retrieves User by given id
const getUserById = async (req: Request, res: Response) => {
  let id = parseInt(req.params.id);

  const sql = "SELECT u.*, (SELECT json_agg(reviews) FROM reviews WHERE reviews.username = u.username) AS reviews FROM users u WHERE u.id = $1;"

  pool.query(
    sql,
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

const createUser = async (req: Request, res: Response) => {
  let { username, email, password } = req.body;

  pool.query(
    "insert into users (username, email, password) values ($1, $2, $3) returning *",
    [username, email, password],
    (err: Error, result: QueryResult) => {
      if (err) {
        res.status(500).json({ err: err.message });
        return;
      }
      res.status(200).json(result.rows);
    }
  );
};

const updateUser = async (req: Request, res: Response) => {
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
