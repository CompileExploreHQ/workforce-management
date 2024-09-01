import { Router } from "express";

import authMiddleware from "@src/middleware/authMiddleware";
import authCheckErrorHandler from "@src/middleware/authCheckErrorHandler";
import attachId from "@src/middleware/attachId";

import AuthRouter from "@src/routes/Auth";
import UserRouter from "@src/routes/User";
import WorkspaceRoutes from "@src/routes/Workspace";

import jsonApiErrors from "@src/middleware/jsonApiErrors";

const baseRouter = () => {
  const router = Router();

  router.use("/auth", AuthRouter());

  router.use(authMiddleware);
  router.use(authCheckErrorHandler);
  router.use(attachId);

  router.use("/users", UserRouter());
  router.use("/workspace", WorkspaceRoutes());

  router.use(jsonApiErrors());

  return router;
};

export default baseRouter;
