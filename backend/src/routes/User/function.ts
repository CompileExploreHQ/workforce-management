import { RouteError } from "@src/common/error";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import User, { IUser } from "@src/repos/UserRepo";
import { InferType } from "yup";
import { putUserDetailsBodySchema } from "./validation";
import mongoose, { ClientSession } from "mongoose";
import logger from "jet-logger";

export async function getUserPermissions(userId: string): Promise<string[]> {
  const result = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },

    {
      $lookup: {
        from: "roles",
        localField: "roles",
        foreignField: "roleName",
        as: "user_roles",
      },
    },

    { $unwind: "$user_roles" },

    { $unwind: "$user_roles.permissions" },

    {
      $group: {
        _id: "$_id",
        permissions: { $addToSet: "$user_roles.permissions" },
      },
    },
  ]);

  return result.length > 0 ? result[0].permissions : [];
}

export async function getUserDetailsById(
  userId: string
): Promise<Omit<IUser, "password" | "sub">> {
  try {
    console.log('userIdss', userId);
    
    const user = await User.findById({
      _id: new mongoose.Types.ObjectId(userId),
    }).select("-password -sub");

    if (!user) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, "User not found");
    }

    return user;
  } catch (error) {
    logger.err(error, true);
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to find user"
    );
  }
}

export async function getUserDetailsByEmail(
  email: string
): Promise<Omit<IUser, "password" | "sub">> {
  const user = await User.findOne({ email }).select("-password -sub");

  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, "User not found");
  }

  return user;
}

export async function updateUserDetails(
  userId: string,
  data: InferType<typeof putUserDetailsBodySchema> & {
    profilePicture?: string;
  },
  session?: ClientSession
): Promise<string | undefined> {
  const user = await getUserDetailsById(userId);

  const updateFields: Partial<IUser> = {};
  if (data.email) updateFields.email = data.email;
  if (data.name) updateFields.name = data.name;
  if (data.profilePicture) updateFields.profilePicture = data.profilePicture;
  if (data.role) updateFields.roles = [data.role];
  if (data.workspaceId)
    updateFields.workspaceId = new mongoose.Types.ObjectId(data.workspaceId);

  if (Object.keys(updateFields).length === 0) {
    logger.info("No fields provided to update");
    return;
  }

  if (updateFields.email) {
    let existingUser;
    try {
      existingUser = await getUserDetailsByEmail(updateFields.email);
    } catch (error) {}

    if (existingUser && existingUser.id !== userId) {
      throw new RouteError(
        HttpStatusCodes.BAD_REQUEST,
        `Email(${updateFields.email}) is already taken.`
      );
    }
  }

  const result = await User.findOneAndUpdate(
    { _id: user.id },
    { $set: updateFields },
    { new: true, runValidators: true, context: "query", session }
  ).select("id");

  if (!result) {
    throw new RouteError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "User is not updated"
    );
  }

  return result.id;
}
