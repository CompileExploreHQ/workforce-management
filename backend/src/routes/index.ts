import { Router } from "express";

import Paths from "../common/Paths";
import UserRoutes from "./UserRoutes";

// **** Variables **** //

const apiRouter = Router();
apiRouter.get("/", (req, res) => {
  // res.json({ status: "ok" }).send();
});

// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
