import jsonApiErrors from "@src/middleware/jsonApiErrors";
import { Router } from "express";
import { asyncRoute } from "@src/util/routes";
import {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceDetailsController,
  getWorkspaceUsersController,
  putWorkspaceDetailsController,
} from "./controller";
import checkAccessZones from "@src/middleware/accessZones";
import { Permissions } from "@src/Permissions/Permissions";
import { validateRequest } from "@src/middleware/validator";
import {
  getWorkspaceDetailsPathParamsSchema,
  getWorkspaceUserPathParamsSchema,
  putWorkspaceDetailsBodySchema,
  putWorkspaceDetailsPathParamsSchema,
  workspaceCreateBodySchema,
} from "./validation";

const workspaceRouter = (): Router => {
  const router = Router({ mergeParams: true });

  router.get(
    "/all",
    checkAccessZones([Permissions.WorkspaceRead]),
    asyncRoute(getAllWorkspaces)
  );

  router.post(
    "/create",
    checkAccessZones([Permissions.WorkspaceCreate]),
    validateRequest({ bodySchema: workspaceCreateBodySchema }),
    asyncRoute(createWorkspace)
  );

  router.get(
    "/:workspaceId/details",
    checkAccessZones([Permissions.WorkspaceRead]),
    validateRequest({ paramsSchema: getWorkspaceDetailsPathParamsSchema }),
    asyncRoute(getWorkspaceDetailsController)
  );

  router.put(
    "/:workspaceId/details",
    checkAccessZones([Permissions.WorkspaceEdit]),
    validateRequest({
      paramsSchema: putWorkspaceDetailsPathParamsSchema,
      bodySchema: putWorkspaceDetailsBodySchema,
    }),
    asyncRoute(putWorkspaceDetailsController)
  );

  router.get(
    "/:workspaceId/users",
    checkAccessZones([Permissions.WorkspaceRead, Permissions.UserRead]),
    validateRequest({ paramsSchema: getWorkspaceUserPathParamsSchema }),
    asyncRoute(getWorkspaceUsersController)
  );

  router.use(jsonApiErrors());

  return router;
};

export default workspaceRouter;
