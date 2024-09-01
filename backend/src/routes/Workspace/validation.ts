import * as yup from "yup";

const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?[0-9]{1,15}$/; // Simple phone number regex
const mobileRegex = /^[+]?[0-9]{10,15}$/; // Basic international mobile number regex

export const workspaceCreateBodySchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email("Invalid Email").required(),
    phoneNumber: yup
      .string()
      .matches(phoneRegex, "Invalid Phone Number")
      .required(),
    address: yup.string().required(),
  })
  .required();

export const getWorkspaceDetailsPathParamsSchema = yup
  .object({
    workspaceId: yup.string().required(),
  })
  .required();

export const getWorkspaceUserPathParamsSchema = yup
  .object({
    workspaceId: yup.string().required(),
  })
  .required();
