import { NextFunction, Request, RequestHandler, Response } from "express";

export type AsyncRouteHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

/**
 * Wraps an async function into a valid Express handler
 *
 * @param routeHandler Function to use for this route
 * @template T Response body type
 * @example
 * router.get("/path", asyncRoute(async (req) => {}));
 */
export function asyncRoute<T>(
  routeHandler: AsyncRouteHandler<T>
): RequestHandler {
  return async (req, res, next) => {
    return routeHandler(req, res, next)
      .then((responseObject) => {
        // Prevent double sending of response
        if (res.headersSent) {
          return;
        }

        res.status(200).json(responseObject);
      })
      .catch(next);
  };
}
