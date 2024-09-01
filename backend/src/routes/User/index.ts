import jsonApiErrors from "@src/middleware/jsonApiErrors";
import { Router } from "express";
import { getUserDetails } from "./contrroller";
import { validateRequest } from "@src/middleware/validator";
import { getUserDetailsPathParamsSchema } from "./validation";
import checkAccessZones from "@src/middleware/accessZones";
import { Permissions } from "@src/Permissions/Permissions";
import { asyncRoute } from "@src/util/routes";

const userRouter = (): Router => {
  const router = Router({ mergeParams: true });

  router.get(
    "/:userId/details",
    checkAccessZones([Permissions.UserRead]),
    validateRequest({ paramsSchema: getUserDetailsPathParamsSchema }),
    asyncRoute(getUserDetails)
  );

  router.use(jsonApiErrors());

  return router;
};

export default userRouter;
