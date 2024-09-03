import axios from "axios";
import { stringify } from "query-string";
import { authorisedRequest } from "../requests/requester";

const defaultHeaders = {
  "content-type": "application/json",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GetProps<
  Response = any,
  Error = any,
  QueryParams = any,
  PathParams = any
> {
  headers?: Record<string, string>;
  queryParams?: QueryParams;
}

export async function get<Response, Error, QueryParams, PathParams>(
  path: string,
  { headers, queryParams }: GetProps<Response, Error, QueryParams, PathParams>
): Promise<Response> {
  let url = path;

  if (queryParams && Object.keys(queryParams).length > 0) {
    url += `?${stringify(queryParams, { arrayFormat: "bracket" })}`;
  }

  return authorisedRequest.instance
    .request<Response>({
      method: "GET",
      url,
      headers: { ...defaultHeaders, ...headers },
    })
    .then((response) => {
      if (axios.isAxiosError(response)) {
        throw response;
      }

      return response.data;
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MutateProps<
  Response = any,
  Error = any,
  QueryParams = any,
  Body = any,
  PathParams = any
> {
  headers?: Record<string, string>;
  queryParams?: QueryParams;
  body?: Body;
}

export async function mutate<
  Response = any,
  Error = any,
  QueryParams = any,
  Body = any,
  PathParams = any
>(
  method: "DELETE" | "POST" | "PUT" | "PATCH",
  path: string,
  {
    headers,
    queryParams,
    body,
  }: MutateProps<Response, Error, QueryParams, Body, PathParams>
): Promise<Response> {
  let url = path;
  let data: Body | undefined = body;

  if (method === "DELETE" && typeof body === "string") {
    url += `/${body}`;
    data = undefined;
  }

  if (queryParams && Object.keys(queryParams).length) {
    url += `?${stringify(queryParams, { arrayFormat: "bracket" })}`;
  }

  return authorisedRequest.instance
    .request({
      method,
      url,
      data,
      headers: { ...defaultHeaders, ...headers },
    })
    .then((response) => {
      if (axios.isAxiosError(response)) {
        throw response;
      }

      return response.data;
    });
}
