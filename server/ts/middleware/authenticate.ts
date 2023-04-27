import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()
const secret = process.env.SECRET_JWT_KEY!

// Function to generate a JWT token
const createToken = (username:string) => {
  // Define a secret key to sign the JWT token
  
  // Generate JWT with jsonwebtoken.sign method
  const token = sign({ username: username }, secret, {expiresIn: "1d"})
  // return the token
  return token
}

// Function to verify a JWT token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  if (!token) {
    res.status(401).send({ message: "Acces denied!"})
  }

  try {
    const validToken = verify(token, secret);
    console.log(validToken); // { userId: 123, iat: 1653047143 }
    next()
  } catch (err) {
    console.error(err)
    res.status(403).send({ message: "Invalid token" })
  }
}

// Export the functions so that they can be used in other files
export default { createToken, verifyToken}