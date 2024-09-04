import { NextFunction, Request, Response } from "express";
import logger from "jet-logger";
import { UnauthorizedError } from "express-jwt";
import { RouteError } from "@src/common/error";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

export default function authCheckErrorHandler(
  err: UnauthorizedError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UnauthorizedError) {
    logger.err(err);
    next(new RouteError(HttpStatusCodes.UNAUTHORIZED, "Authorized"));
  } else {
    res.status(500).send("Error: Please check logs");
  }
}
