import HttpStatusCodes from "@src/common/HttpStatusCodes";
// import EmployeeService from "@src/services/EmployeeService";
// import Employee from "@src/models/Employee";
import { IReq, IRes } from "../common/types";
// import check from "../common/check";

async function getAll(_: IReq, res: IRes) {
  // const employees = await EmployeeService.getAll();
  console.log(_.body.requestUserID);

  return res.status(HttpStatusCodes.OK).json({ employee: { id: "id" } });
}

export default {
  getAll,
} as const;
