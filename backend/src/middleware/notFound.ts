import { RouteError } from "@src/common/error";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { RequestHandler } from "express";

export default function notFound(): RequestHandler {
  return async (req, res, next) => {
    return next(new RouteError(HttpStatusCodes.NOT_FOUND, "Not found"));
  };
}
