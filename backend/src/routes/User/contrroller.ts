import { Request, Response } from "express";
import {
  getUserDetailsById,
  getUserPermissions,
  updateUserDetails,
} from "./function";
import { InferType } from "yup";
import {
  getUserDetailsPathParamsSchema,
  putUserDetailsBodySchema,
} from "./validation";
import { withTransaction } from "@src/util/transaction";
import { filesListToMap } from "@src/util/multipart";

export async function getUserDetails(req: Request, res: Response) {
  const { userId } = req.params as InferType<
    typeof getUserDetailsPathParamsSchema
  >;

  const id = userId === "me" ? req.body.requestUserID : userId;

  const details = await getUserDetailsById(id);
  const accessZones = await getUserPermissions(id);

  return { details, accessZones };
}

export async function putUserDetails(req: Request, res: Response) {
  const { userId } = req.params as InferType<
    typeof getUserDetailsPathParamsSchema
  >;

  const contentType = req.headers["content-type"] ?? "unknown";
  let files: Map<string, Express.Multer.File> | undefined;
  if (contentType?.startsWith("multipart/form-data")) {
    files = filesListToMap(req.files as Express.Multer.File[]);
  }

  const data = req.body as InferType<typeof putUserDetailsBodySchema>;
  const profilePicture = files
    ?.get("profilePicture")
    ?.buffer?.toString("base64");

  const id = userId === "me" ? req.body.requestUserID : userId;

  const result = await withTransaction(async (session) => {
    const details = await updateUserDetails(
      id,
      { ...data, profilePicture },
      session
    );
    return details;
  });

  return result;
}
