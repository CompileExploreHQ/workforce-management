import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";

export default function authCheckErrorHandler(
  err: UnauthorizedError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UnauthorizedError) {
    console.error(err);
    next(new Error("Authorization error"));
  } else {
    res.status(500).send("Error: Please check logs");
  }
}
