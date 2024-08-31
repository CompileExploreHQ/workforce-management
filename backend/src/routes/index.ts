import { Router } from "express";

import authMiddleware from "@src/middleware/authMiddleware";
import authCheckErrorHandler from "@src/middleware/authCheckErrorHandler";
import attachId from "@src/middleware/attachId";

import AuthRoutes from "@src/routes/Auth";
import EmployeeRoutes from "@src/routes/Employee";
import { validateRequest } from "@src/middleware/validator";

import {
  employeeLoginBodySchema,
  employeeRegisterBodySchema,
} from "@src/routes/Auth/validation";

const router = Router();

// #region Auth Router
const authRouter = Router();
authRouter.post(
  "/register",
  validateRequest({ bodySchema: employeeRegisterBodySchema }),
  AuthRoutes.register
);
authRouter.post(
  "/login",
  validateRequest({ bodySchema: employeeLoginBodySchema }),
  AuthRoutes.login
);
router.use("/auth", authRouter);
// #endregion

// #region Authentications
router.use(authMiddleware);
router.use(authCheckErrorHandler);
router.use(attachId);
// #endregion

// #region Employee Router
const employeeRouter = Router();
employeeRouter.get("/all", EmployeeRoutes.getAll);
router.use("/employee", employeeRouter);
// #endregion

export default router;
