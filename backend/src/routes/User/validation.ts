import { Roles } from "@src/Permissions/Permissions";
import * as yup from "yup";

export const getUserDetailsPathParamsSchema = yup
  .object({
    userId: yup.string().required(),
  })
  .required();

export const putUserDetailsPathParamsSchema = yup
  .object({
    userId: yup.string().required(),
  })
  .required();

export const putUserDetailsBodySchema = yup
  .object({
    name: yup.string(),
    email: yup.string().email(),
    role: yup.string().oneOf(Object.values(Roles), "Invalid role"),
    workspaceId: yup.string(),
  })
  .required();
