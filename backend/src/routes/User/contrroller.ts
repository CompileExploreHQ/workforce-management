import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { Request, Response } from "express";
import { getUserDetailsById } from "./function";
import { InferType } from "yup";
import { getUserDetailsPathParamsSchema } from "./validation";

export async function getUserDetails(req: Request, res: Response) {
  const { userId } = req.params as InferType<
    typeof getUserDetailsPathParamsSchema
  >;

  const details = await getUserDetailsById(userId);
  return { details };
}
