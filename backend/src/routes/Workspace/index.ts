import jsonApiErrors from "@src/middleware/jsonApiErrors";
import { Router } from "express";
import { asyncRoute } from "@src/util/routes";
import { create } from "./controller";
import checkAccessZones from "@src/middleware/accessZones";
import { Permissions } from "@src/Permissions/Permissions";

const workspaceRouter = (): Router => {
  const router = Router();

  router.post(
    "/create",
    checkAccessZones([Permissions.WorkspaceCreate]),
    asyncRoute(create)
  );

  router.use(jsonApiErrors());

  return router;
};

export default workspaceRouter;
