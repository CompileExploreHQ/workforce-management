import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "../common/types";
import User from "@src/repos/UserRepo";
import { hashPassword, validatePassword } from "@src/util/encryption";
import { generateUniqueString } from "@src/util/string";
import { generateToken } from "@src/util/token";

async function login(
  req: IReq & { body: { email: string; password: string } },
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
  req: IReq & { body: { email: string; name: string } },
  res: IRes
) {
  const email = req.body.email.trim() as string;
  const name = req.body.name.trim() as string;

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
  newUser.role = "Employee";
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
