import * as yup from "yup";

export const getUserDetailsPathParamsSchema = yup
  .object({
    userId: yup.string().required(),
  })
  .required();
