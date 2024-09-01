import HttpStatusCodes from "@src/common/HttpStatusCodes";
import User from "@src/repos/UserRepo";
import { hashPassword, validatePassword } from "@src/util/encryption";
import { generateUniqueString } from "@src/util/string";
import { generateToken } from "@src/util/token";
import { filesListToMap } from "@src/util/multipart";
import { userLoginBodySchema, userRegisterBodySchema } from "./validation";
import { InferType } from "yup";
import { withTransaction } from "@src/util/transaction";
import { ClientSession } from "mongoose";
import { RouteError } from "@src/common/error";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const body = req.body as InferType<typeof userLoginBodySchema>;
  const email = body.email.trim();

  const user = await User.findOne({ email });
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      "Email hasn't registered yet."
    );
  }

  const isValidPassword = await validatePassword(body.password, user.password);
  if (!isValidPassword) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, "Invalid Password");
  }

  const token = generateToken({ sub: user.sub });

  res.status(HttpStatusCodes.OK).json({ token }).send();
  return;
}

export async function register(req: Request, res: Response) {
  const body = req.body as InferType<typeof userRegisterBodySchema>;

  const contentType = req.headers["content-type"] ?? "unknown";
  let files: Map<string, Express.Multer.File> | undefined;
  if (contentType?.startsWith("multipart/form-data")) {
    files = filesListToMap(req.files as Express.Multer.File[]);
  }

  const email = body.email.trim();
  const name = body.name.trim();
  const role = body.role;

  const user = await User.findOne({ email });
  if (user) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      "Email is already registered"
    );
  }

  const password = await hashPassword(body.password);

  await withTransaction(async (session: ClientSession) => {
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.sub = generateUniqueString(20);
    newUser.password = password;
    newUser.roles = [role];
    newUser.profilePicture = files
      ?.get("profilePicture")
      ?.buffer?.toString("base64");

    await newUser.save({ session });

    res
      .status(HttpStatusCodes.OK)
      .send({
        success: true,
      })
      .send();
  });
}
