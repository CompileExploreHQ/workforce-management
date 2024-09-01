import jsonApiErrors from "@src/middleware/jsonApiErrors";
import { Router } from "express";
import { asyncRoute } from "@src/util/routes";
import { createWorkspace, getAllWorkspaces } from "./controller";
import checkAccessZones from "@src/middleware/accessZones";
import { Permissions } from "@src/Permissions/Permissions";
import { validateRequest } from "@src/middleware/validator";
import { workspaceCreateBodySchema } from "./validation";

const workspaceRouter = (): Router => {
  const router = Router();

  router.get("/all", asyncRoute(getAllWorkspaces));

  router.post(
    "/create",
    checkAccessZones([Permissions.WorkspaceCreate]),
    validateRequest({ bodySchema: workspaceCreateBodySchema }),
    asyncRoute(createWorkspace)
  );

  router.use(jsonApiErrors());

  return router;
};

export default workspaceRouter;
