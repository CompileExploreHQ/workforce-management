import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "../common/types";

async function create(_: IReq, res: IRes) {
  return res.status(HttpStatusCodes.OK).json({ user: { id: "id" } });
}

export default {
  create,
} as const;
