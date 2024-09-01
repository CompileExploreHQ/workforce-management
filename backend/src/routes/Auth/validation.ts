import { Roles } from "@src/Permissions/Permissions";
import * as yup from "yup";

export const userRegisterBodySchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().oneOf(Object.values(Roles), "Invalid role").required(),
  })
  .required();

export const userLoginBodySchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
