import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "../common/types";
import User from "@src/repos/UserRepo";
import { hashPassword, validatePassword } from "@src/util/encryption";
import { generateUniqueString } from "@src/util/string";
import { generateToken } from "@src/util/token";
import { filesListToMap } from "@src/util/multipart";
import { userLoginBodySchema, userRegisterBodySchema } from "./validation";
import { InferType } from "yup";
import { Roles } from "@src/Permissions/Permissions";

async function login(
  req: IReq & {
    body: InferType<typeof userLoginBodySchema>;
  },
  res: IRes
) {
  const email = req.body.email.trim() as string;

  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({
        success: false,
        message: "Bad Request",
        error: "Email hasn't registered yet.",
      })
      .send();
    return;
  }

  const isValidPassword = await validatePassword(
    req.body.password as string,
    user.password
  );
  if (!isValidPassword) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({
        success: false,
        message: "Bad Request",
        error: "Invalid Password",
      })
      .send();
    return;
  }

  const token = generateToken({ sub: user.sub });

  res.status(HttpStatusCodes.OK).json({ token }).send();
  return;
}

async function register(
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
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({
        success: false,
        message: "Bad Request",
        error: "Email is already registered",
      })
      .send();
    return;
  }

  const password = await hashPassword(req.body.password as string);

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.sub = generateUniqueString(20);
  newUser.password = password;
  newUser.roles = [role];
  newUser.profilePicture = files?.get("profilePicture")?.buffer?.toString();
  newUser.save();

  res
    .status(HttpStatusCodes.OK)
    .send({
      success: true,
    })
    .send();
}

export default {
  login,
  register,
} as const;
