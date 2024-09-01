import jsonApiErrors from "@src/middleware/jsonApiErrors";
import { Router } from "express";

const userRouter = (): Router => {
  const router = Router();

  router.use(jsonApiErrors());

  return router;
};

export default userRouter;
