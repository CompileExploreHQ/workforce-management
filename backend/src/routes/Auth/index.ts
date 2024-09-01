import jsonApiErrors from "@src/middleware/jsonApiErrors";
import multipartMiddleware from "@src/middleware/multipart";
import { validateRequest } from "@src/middleware/validator";
import { Router } from "express";
import { userLoginBodySchema, userRegisterBodySchema } from "./validation";
import { asyncRoute } from "@src/util/routes";
import { login, register } from "./controller";

const authRouter = (): Router => {
  const router = Router();

  router.post(
    "/register",
    multipartMiddleware,
    validateRequest({ bodySchema: userRegisterBodySchema }),
    asyncRoute(register)
  );

  router.post(
    "/login",
    validateRequest({ bodySchema: userLoginBodySchema }),
    asyncRoute(login)
  );

  router.use(jsonApiErrors());

  return router;
};

export default authRouter;
