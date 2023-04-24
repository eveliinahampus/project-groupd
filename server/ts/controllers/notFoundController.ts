import { Request, Response, NextFunction } from "express";

const handle404Error = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("<h3>Oops! 404 We couldn't find what you were looking for. Please check the URL and try again.</h3>")
}

export default { handle404Error }