import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "../common/types";

async function getAll(_: IReq, res: IRes) {
  console.log(_.body.requestUserID);
  return res.status(HttpStatusCodes.OK).json({ user: { id: "id" } });
}

export default {
  getAll,
} as const;
