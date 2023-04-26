import { Request, Response } from "express";
import authorize from "../middleware/authenticate";

const login = (req: Request, res: Response) => {
  // This is to handle posted credentials and check if they are valid

  // Read username and password from request body
  const { username, password } = req.body;
  // Console log that somebody's trying to log in
  console.log(
    `Trying to log in with username: ${username} and password: ${password}`
  );
  // Check if the username and password are valid
  if (username === "admin" && password === "password") {
    // Create a JWT token
    const token = authorize.createToken(username);
    // Save token in a cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
    // Login successful
    return res.send({ message: "Logged in successfully" });
  }
  // Login failed
  return res.status(401).send("Invalid credentials!");
};

// Controller to handle user logout
const logout = (req: Request, res: Response) => {
  // Clear the JWT cookie
  res.clearCookie("token");
  res.send({ message: "Logged out successfully" });
};

export default { login, logout };
