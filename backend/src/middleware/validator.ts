import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

interface ValidationSchemas {
  bodySchema?: yup.ObjectSchema<any>;
  paramsSchema?: yup.ObjectSchema<any>;
  querySchema?: yup.ObjectSchema<any>;
}

/**
 * Middleware to validate request body, params, and query
 * @param schemas - Object containing schemas for body, params, and query
 */
export const validateRequest = (schemas: ValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { bodySchema, paramsSchema, querySchema } = schemas;

    try {
      if (bodySchema) {
        await bodySchema.validate(req.body, { abortEarly: false });
      }

      if (paramsSchema) {
        await paramsSchema.validate(req.params, { abortEarly: false });
      }

      if (querySchema) {
        await querySchema.validate(req.query, { abortEarly: false });
      }

      next();
    } catch (error) {
      res.status(400).json({
        errors: error.errors || ["Invalid request data"],
      });
    }
  };
};
