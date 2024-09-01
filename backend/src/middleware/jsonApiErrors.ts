import EnvVars from "@src/common/EnvVars";
import { RouteError } from "@src/common/error";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { NodeEnvs } from "@src/common/misc";
import { ErrorRequestHandler, NextFunction, Response } from "express";
import logger from "jet-logger";

/**
 * Factory for an error middleware that is similar to JSON API's error definitions
 * @param options Options for creating errors
 */
export default function jsonApiErrors(): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true);
    }
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  };
}
