import { Router } from "express";

import authMiddleware from "@src/middleware/authMiddleware";
import authCheckErrorHandler from "@src/middleware/authCheckErrorHandler";
import attachId from "@src/middleware/attachId";

import AuthRoutes from "@src/routes/Auth";
import UserRoutes from "@src/routes/User";
import { validateRequest } from "@src/middleware/validator";

import {
  userLoginBodySchema,
  userRegisterBodySchema,
} from "@src/routes/Auth/validation";
import multipartMiddleware from "@src/middleware/multipart";

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
workspaceRouter.get("/all", UserRoutes.getAll);
router.use("/workspace", workspaceRouter);
// #endregion

// #region User Router
const userRouter = Router();
userRouter.get("/all", UserRoutes.getAll);
router.use("/users", userRouter);
// #endregion

export default router;
