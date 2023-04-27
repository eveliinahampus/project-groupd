import { Request, Response, NextFunction } from "express";
import authorize from "../middleware/authenticate";
import openDb from "../db_connect";

const login = async (req: Request, res: Response, next: NextFunction) => {
  // This is to handle posted credentials and check if they are valid

  // Read username and password from request body
  const { username, email, password } = req.body;
  // Console log that somebody's trying to log in
  console.log(
    `Trying to log in with username: ${username}, email: ${email} and password: ${password}`
  );
  // Query the database to check if the user exists
  const pool = openDb()
  const sql = "SELECT * FROM users WHERE username=$1 AND email=$2 AND password=$3"

  const result = await pool.query(sql,[username,email,password])
  // Check if the username and password are valid
  if (result.rowCount > 0) {
    // Create a JWT token
    const token = authorize.createToken(username);
    // Save token in a cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
    // Login successful
    return res.json({ message: "Logged in successfully" });
    //next()
  } else {
    // Login failed
    return res.status(401).json({ message: "Invalid credentials!"});
  }

  /* Class example!
  // if (username === "admin" && email === "admin@admin.com" && password === "1234") {
  //   // Create a JWT token
  //   const token = authorize.createToken(username);
  //   // Save token in a cookie
  //   res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
  //   // Login successful
  //   return res.json({ message: "Logged in successfully", token: token });
  // }

  // Login failed
  return res.status(401).json({ message: "Invalid credentials!"});
  */
};

// Controller to handle user logout
const logout = (req: Request, res: Response) => {
  // Clear the JWT cookie
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export default { login, logout };
