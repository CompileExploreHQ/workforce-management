import { RouteError } from "@src/common/error";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import User, { IUser } from "@src/repos/UserRepo";
import Workspace, { IWorkspace } from "@src/repos/WorkspaceRepo";
import mongoose from "mongoose";

export async function getWorkspaceUsers(
  id: string
): Promise<Omit<IUser, "password" | "sub">[]> {
  const users = await User.find({
    workspaceId: new mongoose.Types.ObjectId(id),
  }).select("-password -sub");

  return users;
}

export async function getWorkspaceDetails(id: string): Promise<IWorkspace> {
  const workspace = await Workspace.findById(new mongoose.Types.ObjectId(id));

  if (!workspace) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, "Workspace not found");
  }

  return workspace;
}
