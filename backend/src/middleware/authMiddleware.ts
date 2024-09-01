import { expressjwt, Params } from "express-jwt";
import EnvVars from "@src/common/EnvVars";

const authMiddlewareParams: Params = {
  secret: EnvVars.JwtSecret,
  algorithms: ["HS256"],
};

export default expressjwt(authMiddlewareParams);
