import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "../common/types";
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

export async function login(
  req: IReq & {
    body: InferType<typeof userLoginBodySchema>;
  },
  res: IRes
) {
  const email = req.body.email.trim() as string;

  const user = await User.findOne({ email });
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      "Email hasn't registered yet."
    );
  }

  const isValidPassword = await validatePassword(
    req.body.password as string,
    user.password
  );
  if (!isValidPassword) {
    throw new RouteError(HttpStatusCodes.BAD_REQUEST, "Invalid Password");
  }

  const token = generateToken({ sub: user.sub });

  res.status(HttpStatusCodes.OK).json({ token }).send();
  return;
}

export async function register(
  req: IReq & {
    body: InferType<typeof userRegisterBodySchema>;
  },
  res: IRes
) {
  const contentType = req.headers["content-type"] ?? "unknown";
  let files: Map<string, Express.Multer.File> | undefined;
  if (contentType?.startsWith("multipart/form-data")) {
    files = filesListToMap(req.files as Express.Multer.File[]);
  }

  const email = req.body.email.trim();
  const name = req.body.name.trim();
  const role = req.body.role;

  const user = await User.findOne({ email });
  if (user) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      "Email is already registered"
    );
  }

  const password = await hashPassword(req.body.password as string);

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
