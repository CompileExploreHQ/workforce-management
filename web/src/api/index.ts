import { get, GetProps, mutate, MutateProps } from "./util";

export interface GetUsersUserResponse {
  details: any;
  accessZones: string[];
}

export interface GetUsersUserPathParams {
  userId: string;
}

export type GetUsersUserProps = GetProps<
  GetUsersUserResponse,
  void,
  void,
  GetUsersUserPathParams
> & { userId: string };

export async function getUsersUser({ userId, ...props }: GetUsersUserProps) {
  return get<GetUsersUserResponse, void, void, GetUsersUserPathParams>(
    `/users/${encodeURIComponent(userId)}/details`,
    props
  );
}
