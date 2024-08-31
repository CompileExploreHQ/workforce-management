import * as yup from "yup";

export const userRegisterBodySchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup
      .string()
      .oneOf(["Employee", "SuperAdmin", "WorkspaceAdmin"])
      .required(),
  })
  .required();

export const userLoginBodySchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
