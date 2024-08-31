// import { RouteError } from "@src/common/classes";
// import HttpStatusCodes from "@src/common/HttpStatusCodes";

// import EmployeeRepo from "@src/repos/EmployeeRepo";
// import { IEmployee } from "@src/models/Employee";

// export const EMPLOYEE_NOT_FOUND_ERR = "Employee not found";

// function getAll(): Promise<IEmployee[]> {
//   return EmployeeRepo.find();
// }

// function addOne(employee: IEmployee): Promise<void> {
//   return EmployeeRepo.create(employee);
// }

// async function updateOne(employee: IEmployee): Promise<void> {
//   const persists = await EmployeeRepo.persists(employee.id);
//   if (!persists) {
//     throw new RouteError(HttpStatusCodes.NOT_FOUND, EMPLOYEE_NOT_FOUND_ERR);
//   }
//   return EmployeeRepo.update(employee);
// }

// async function _delete(id: number): Promise<void> {
//   const persists = await EmployeeRepo.persists(id);
//   if (!persists) {
//     throw new RouteError(HttpStatusCodes.NOT_FOUND, EMPLOYEE_NOT_FOUND_ERR);
//   }
//   return EmployeeRepo.delete(id);
// }

// export default {
//   getAll,
//   addOne,
//   updateOne,
//   delete: _delete,
// } as const;
