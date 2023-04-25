import { Request, Response, NextFunction } from "express";
import jwt, { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.SECRET_JWT_KEY);
// Function to generate a JWT token
const createToken = (username:string) => {
  // Define a secret key to sign the JWT token
  const secret = process.env.SECRET_JWT_KEY
  // Generate JWT with jsonwebtoken.sign method
  const token = sign({ username: username }, secret, {expiresIn: "1d"})
  // return the token
  return token
}

// Function to verify a JWT token
const verifyTocken = (req: Request, res: Response, next: NextFunction) => {
  const accesTocken = req.cookies.tocken

  if (!accesTocken) {
    return res.status(401).send("Acces denied!")
  }

  try {
  const validTocken = jwt.verify(accesTocken, secret);
  console.log(validTocken); // { userId: 123, iat: 1653047143 }
  } catch (err) {
    console.error(err)
    res.status(401).send("Acces denied!")
  }
  
  next()
}

// Export the functions so that they can be used in other files
export default { createToken, verifyTocken}