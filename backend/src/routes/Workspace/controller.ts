import { InferType } from "yup";
import {
  getWorkspaceDetailsPathParamsSchema,
  getWorkspaceUserPathParamsSchema,
  putWorkspaceDetailsBodySchema,
  putWorkspaceDetailsPathParamsSchema,
  workspaceCreateBodySchema,
} from "./validation";
import { withTransaction } from "@src/util/transaction";
import { ClientSession } from "mongoose";
import { filesListToMap } from "@src/util/multipart";
import Workspace from "@src/repos/WorkspaceRepo";
import { RouteError } from "@src/common/error";
import {
  getWorkspaceDetails,
  getWorkspaceUsers,
  updateWorkspaceDetails,
} from "./function";
import { Request, Response } from "express";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

export async function getAllWorkspaces(req: Request, res: Response) {
  const workspaces = await Workspace.find();

  return {
    workspaces: workspaces.map((w) => ({
      id: w.id,
      name: w.name,
      email: w.email,
      phoneNumber: w.phoneNumber,
      address: w.address,
      logo: w.logo,
    })),
  };
}

export async function createWorkspace(req: Request, res: Response) {
  const body = req.body as InferType<typeof workspaceCreateBodySchema>;
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

  const name = body.name.trim();
  const email = body.email.trim();
  const address = body.address.trim();
  const phoneNumber = body.phoneNumber.trim();

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

  return result;
}

export async function getWorkspaceUsersController(req: Request, res: Response) {
  const { workspaceId } = req.params as InferType<
    typeof getWorkspaceUserPathParamsSchema
  >;
  const employees = await getWorkspaceUsers(workspaceId);

  return {
    employees,
  };
}

export async function getWorkspaceDetailsController(
  req: Request,
  res: Response
) {
  const { workspaceId } = req.params as InferType<
    typeof getWorkspaceDetailsPathParamsSchema
  >;

  const details = await getWorkspaceDetails(workspaceId);

  return { details };
}

export async function putWorkspaceDetailsController(
  req: Request,
  res: Response
) {
  const { workspaceId } = req.params as InferType<
    typeof putWorkspaceDetailsPathParamsSchema
  >;

  const contentType = req.headers["content-type"] ?? "unknown";
  let files: Map<string, Express.Multer.File> | undefined;
  if (contentType?.startsWith("multipart/form-data")) {
    files = filesListToMap(req.files as Express.Multer.File[]);
  }

  const data = req.body as InferType<typeof putWorkspaceDetailsBodySchema>;
  const logo = files?.get("logo")?.buffer?.toString("base64");

  const result = await withTransaction(async (session) => {
    const details = await updateWorkspaceDetails(
      workspaceId,
      { ...data, logo },
      session
    );
    return details;
  });

  return result;
}
