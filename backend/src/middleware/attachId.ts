import { NextFunction, Request, Response } from "express";
// import { getUserIdSessionFromTokenIdentifier } from "./db";
import UserRepo from "@src/repos/EmployeeRepo";

export default async function attachId(
  req: Request & { auth?: { sub: string } },
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (req.auth) {
      const authId = req.auth.sub;
      const user = await UserRepo.findOne({ sub: authId }).select("_id");
      req.body.requestUserID = user?._id;
    }
    return next();
  } catch (err) {
    return next(err);
  }
}
