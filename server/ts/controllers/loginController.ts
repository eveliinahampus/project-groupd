import { Request, Response, NextFunction } from "express";
import authorize from "../middleware/authorize";

const loging = (req: Request, res: Response, next: NextFunction) => {
  // This is to handle posted credentials and check if they are valid

  // Read username and password from request body
  const { username, password } = req.body;
  // Console log that somebody's trying to log in
  console.log(
    `Trying to log in with username: ${username} and password: ${password}`
  );
  // Check if the username and password are valid
  if (username === "mary" && password === "password") {
    // Create a JWT token
    const token = authorize.createToken(username);
    // Save token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
    });
    // Login successful
    return res.json({ message: "Login successful!", token: token });
  }
  // Login failed
  return res.status(401).send("Login failed!");
}

export default { loging }
