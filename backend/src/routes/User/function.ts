import { RouteError } from "@src/common/error";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import User, { IUser } from "@src/repos/UserRepo";

export async function getUserDetailsById(
  userId: string
): Promise<Omit<IUser, "password" | "sub">> {
  const user = await User.findOne({ _id: userId }).select("-password -sub");

  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, "User not found");
  }

  return user;
}
