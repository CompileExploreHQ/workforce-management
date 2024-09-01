import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "../common/types";
import { InferType } from "yup";
import { workspaceCreateBodySchema } from "./validation";
import { withTransaction } from "@src/util/transaction";
import { ClientSession } from "mongoose";
import { filesListToMap } from "@src/util/multipart";
import Workspace from "@src/repos/WorkspaceRepo";
import { RouteError } from "@src/common/error";

export async function getAllWorkspaces(req: IReq, res: IRes) {
  const workspaces = await Workspace.find();

  return res.status(HttpStatusCodes.OK).json({
    workspaces: workspaces.map((w) => ({
      id: w.id,
      name: w.name,
      email: w.email,
      phoneNumber: w.phoneNumber,
      address: w.address,
      logo: w.logo,
    })),
  });
}

export async function createWorkspace(
  req: IReq & {
    body: InferType<typeof workspaceCreateBodySchema>;
  },
  res: IRes
) {
  const contentType = req.headers["content-type"] ?? "unknown";
  let files: Map<string, Express.Multer.File> | undefined;
  if (contentType?.startsWith("multipart/form-data")) {
    files = filesListToMap(req.files as Express.Multer.File[]);
  }

  if (!files?.size) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      `logo is required field.`
    );
  }

  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const address = req.body.address.trim();
  const phoneNumber = req.body.phoneNumber.trim();

  const result = await withTransaction(async (session: ClientSession) => {
    const workspace = await Workspace.findOne({ email }).select("id");
    if (workspace) {
      throw new RouteError(
        HttpStatusCodes.BAD_REQUEST,
        `Workspace with email(${email}) is already registered.`
      );
    }

    const newWorkspace = new Workspace();
    newWorkspace.logo = files?.get("logo")?.buffer?.toString("base64")!;
    newWorkspace.name = name;
    newWorkspace.email = email;
    newWorkspace.phoneNumber = address;
    newWorkspace.address = phoneNumber;

    const insertedWorkspace = await newWorkspace.save({ session });

    return { id: insertedWorkspace.id };
  });

  return res.status(HttpStatusCodes.OK).json(result);
}
