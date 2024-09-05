import { get, GetProps, mutate, MutateProps } from "./util";

export interface UserDetails {
  id: string;
  roles: string[];
  name: string;
  email: string;
  profilePicture: string;
  workspaceId?: string;
}
export interface GetUsersUserResponse {
  details: UserDetails;
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
export interface WorkspaceSummary {
  id: string;
  name: string;
  logo: string;
}
export interface GetWorkspaceListResponse {
  workspaces: WorkspaceSummary[];
}

export type GetWorkspaceListProps = GetProps<
  GetWorkspaceListResponse,
  void,
  void,
  void
> & {};

export async function getWorkspaceList(props: GetWorkspaceListProps) {
  return get<GetWorkspaceListResponse, void, void, void>(
    `/workspaces/all`,
    props
  );
}

export interface PutUserDetailsResponse {
  [key: string]: {};
}

export interface PutUserDetailsPathParams {
  userId: string;
}

export interface PutUserDetailsRequestBody {
  [key: string]: {};
}

export type PutUsersUserPreferencesProps = MutateProps<
  PutUserDetailsResponse,
  void,
  void,
  PutUserDetailsRequestBody,
  PutUserDetailsPathParams
> & {
  userId: string;
};

export async function putUserDetails({
  userId,
  ...props
}: PutUsersUserPreferencesProps) {
  return mutate<
    PutUserDetailsResponse,
    void,
    void,
    PutUserDetailsRequestBody,
    PutUserDetailsPathParams
  >("PUT", `/users/${encodeURIComponent(userId)}/details`, props);
}
