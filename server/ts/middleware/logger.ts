import { Request, Response, NextFunction } from "express";

// // A middleware function to log information about each incoming request
const logger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method
  const url = req.url
  const time = new Date().getDay()
  console.log(method, url, time);
  next()
}

export default { logger }