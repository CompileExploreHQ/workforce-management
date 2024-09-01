import User from "@src/repos/UserRepo";
import { RequestHandler } from "express";
import mongoose from "mongoose";

async function getUserPermissions(
  userId: mongoose.Types.ObjectId
): Promise<string[]> {
  const result = await User.aggregate([
    { $match: { _id: userId } },

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

function hasAllOfAccessZones(
  zones: string[],
  requiredZones: string[]
): boolean {
  for (let i = 0; i < requiredZones.length; i++) {
    if (!zones.includes(requiredZones[i])) {
      return false;
    }
  }
  return true;
}

function hasAnyOfAccessZones(
  zones: string[],
  requiredZones: string[]
): boolean {
  if (requiredZones.length === 0) {
    return true;
  }

  for (let i = 0; i < requiredZones.length; i++) {
    if (zones.includes(requiredZones[i])) {
      return true;
    }
  }

  return false;
}

export const insufficientPermissionsError = new Error(
  "Insufficient permissions"
);

export default function checkAccessZones(
  requiredZones: string[],
  allowWithAny: boolean = false
): RequestHandler {
  return async (req, res, next) => {
    const { body } = req;

    try {
      const userId = body?.requestUserID;
      if (userId === undefined) {
        throw new Error("Unable to get user. Is the request body set?");
      }

      const permissions = await getUserPermissions(userId);

      const hasAccess = allowWithAny
        ? hasAnyOfAccessZones(permissions, requiredZones)
        : hasAllOfAccessZones(permissions, requiredZones);

      if (hasAccess) {
        next();
      } else {
        next(insufficientPermissionsError);
      }
    } catch (err) {
      next(err);
    }
  };
}
