import { expressjwt, Params } from "express-jwt";

const secret = process.env.JWT_SECRET ?? "";

const authMiddlewareParams: Params = {
  secret,
  algorithms: ["HS256"],
};

export default expressjwt(authMiddlewareParams);
