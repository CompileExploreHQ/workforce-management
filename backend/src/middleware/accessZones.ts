import { getUserPermissions } from "@src/routes/User/function";
import { RequestHandler } from "express";

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
