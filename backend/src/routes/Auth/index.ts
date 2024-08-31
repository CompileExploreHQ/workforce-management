import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "../common/types";
import Employee from "@src/repos/EmployeeRepo";
import { hashPassword, validatePassword } from "@src/util/encryption";
import { generateUniqueString } from "@src/util/string";
import { generateToken } from "@src/util/token";
import { filesListToMap } from "@src/util/multipart";
import {
  employeeLoginBodySchema,
  employeeRegisterBodySchema,
} from "./validation";
import { InferType } from "yup";

async function login(
  req: IReq & {
    body: InferType<typeof employeeLoginBodySchema>;
  },
  res: IRes
) {
  const email = req.body.email.trim() as string;

  const employee = await Employee.findOne({ email });
  if (!employee) {
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
    employee.password
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

  const token = generateToken({ sub: employee.sub });

  res.status(HttpStatusCodes.OK).json({ token }).send();
  return;
}

async function register(
  req: IReq & {
    body: InferType<typeof employeeRegisterBodySchema>;
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

  const employee = await Employee.findOne({ email });
  if (employee) {
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

  const newEmployee = new Employee();
  newEmployee.name = name;
  newEmployee.email = email;
  newEmployee.sub = generateUniqueString(20);
  newEmployee.password = password;
  newEmployee.role = role;
  newEmployee.profilePicture = files?.get("profilePicture")?.buffer?.toString();
  newEmployee.save();

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
