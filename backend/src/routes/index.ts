import { Router } from "express";

import authMiddleware from "@src/middleware/authMiddleware";
import authCheckErrorHandler from "@src/middleware/authCheckErrorHandler";
import attachId from "@src/middleware/attachId";
import { validateRequest } from "@src/middleware/validator";
import multipartMiddleware from "@src/middleware/multipart";
import checkAccessZones from "@src/middleware/accessZones";

import { Permissions } from "@src/Permissions/Permissions";

import {
  userLoginBodySchema,
  userRegisterBodySchema,
} from "@src/routes/Auth/validation";

import AuthRoutes from "@src/routes/Auth";
import UserRoutes from "@src/routes/User";
import WorkspaceRoutes from "@src/routes/Workspace";

const router = Router();

// #region Auth Router
const authRouter = Router();
authRouter.post(
  "/register",
  multipartMiddleware,
  validateRequest({ bodySchema: userRegisterBodySchema }),
  AuthRoutes.register
);
authRouter.post(
  "/login",
  validateRequest({ bodySchema: userLoginBodySchema }),
  AuthRoutes.login
);
router.use("/auth", authRouter);
// #endregion

// #region Authentications
router.use(authMiddleware);
router.use(authCheckErrorHandler);
router.use(attachId);
// #endregion

// #region Workspace Router
const workspaceRouter = Router();
// workspaceRouter.get(
//   "/all",
//   checkAccessZones([Permissions.WorkspaceRead]),
//   UserRoutes.getAll
// );
workspaceRouter.post(
  "/create",
  checkAccessZones([Permissions.WorkspaceCreate]),
  WorkspaceRoutes.create
);
router.use("/workspace", workspaceRouter);
// #endregion

// #region User Router
// const userRouter = Router();
// userRouter.get("/all", checkAccessZones(["Employee"]), UserRoutes.getAll);
// router.use("/users", userRouter);
// #endregion

export default router;
