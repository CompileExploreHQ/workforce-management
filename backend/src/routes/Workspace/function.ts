import { RouteError } from "@src/common/error";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import User, { IUser } from "@src/repos/UserRepo";
import Workspace, { IWorkspace } from "@src/repos/WorkspaceRepo";
import mongoose, { ClientSession } from "mongoose";
import { InferType } from "yup";
import { putWorkspaceDetailsBodySchema } from "./validation";
import logger from "jet-logger";

export async function getWorkspaceUsers(
  id: string
): Promise<Omit<IUser, "password" | "sub">[]> {
  const users = await User.find({
    workspaceId: new mongoose.Types.ObjectId(id),
  }).select("-password -sub");

  return users;
}

export async function getWorkspaceDetails(id: string): Promise<IWorkspace> {
  try {
    const workspace = await Workspace.findById(new mongoose.Types.ObjectId(id));

    if (!workspace) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, "Workspace not found");
    }

    return workspace;
  } catch (error) {
    logger.err(error, true);
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to find workspace"
    );
  }
}

export async function getWorkspaceByEmail(email: string): Promise<IWorkspace> {
  const workspace = await Workspace.findOne({ email });

  if (!workspace) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, "Workspace not found");
  }

  return workspace;
}

export async function updateWorkspaceDetails(
  workspaceId: string,
  data: InferType<typeof putWorkspaceDetailsBodySchema> & {
    logo?: string;
  },
  session?: ClientSession
): Promise<string | undefined> {
  const workspace = await getWorkspaceDetails(workspaceId);

  const updateFields: Partial<IWorkspace> = {};
  if (data.email) updateFields.email = data.email.trim();
  if (data.name) updateFields.name = data.name.trim();
  if (data.logo) updateFields.logo = data.logo;
  if (data.phoneNumber) updateFields.phoneNumber = data.phoneNumber.trim();
  if (data.address) updateFields.address = data.address.trim();

  if (Object.keys(updateFields).length === 0) {
    logger.info("No fields provided to update");
    return;
  }

  if (updateFields.email) {
    let existingWorkspace;
    try {
      existingWorkspace = await getWorkspaceByEmail(updateFields.email);
    } catch (error) {}

    if (existingWorkspace && existingWorkspace.id !== workspaceId) {
      throw new RouteError(
        HttpStatusCodes.BAD_REQUEST,
        `Email(${updateFields.email}) is already taken.`
      );
    }
  }

  const result = await Workspace.findOneAndUpdate(
    { _id: workspace.id },
    { $set: updateFields },
    { new: true, runValidators: true, context: "query", session }
  ).select("id");

  if (!result) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Workspace is not updated"
    );
  }

  return result.id;
}
