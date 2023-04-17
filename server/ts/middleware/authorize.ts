import { Request, Response, NextFunction } from "express";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  
  next()
}

export default { authorize }