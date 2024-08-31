import { Router } from "express";

import authMiddleware from "@src/middleware/authMiddleware";
import authCheckErrorHandler from "@src/middleware/authCheckErrorHandler";
import attachId from "@src/middleware/attachId";

import AuthRoutes from "@src/routes/Auth";
import UserRoutes from "@src/routes/User";

const router = Router();

// #region Auth Router
const authRouter = Router();
authRouter.post("/register", AuthRoutes.register);
authRouter.post("/login", AuthRoutes.login);
router.use("/auth", authRouter);
// #endregion

// #region Authentications
router.use(authMiddleware);
router.use(authCheckErrorHandler);
router.use(attachId);
// #endregion

// #region User Router
const userRouter = Router();
userRouter.get("/all", UserRoutes.getAll);
userRouter.post("/add", UserRoutes.add);
userRouter.put("/update", UserRoutes.update);
userRouter.delete("/delete/:id", UserRoutes.delete);
router.use("/users", userRouter);
// #endregion

export default router;
