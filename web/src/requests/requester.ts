import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_ENDPOINT } from "../config";

if (!API_ENDPOINT) {
  // eslint-disable-next-line no-console
  console.error("No API_URL environment variable set. Refer to the README");
}

export const authorisedRequester = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
});

function wrapInstance(instance: AxiosInstance) {
  return {
    instance,

    async get<ResponseType>(url: string, config?: AxiosRequestConfig) {
      const response = await instance.get<ResponseType>(url, config);
      if (axios.isAxiosError(response)) {
        throw response;
      }
      return response.data;
    },

    async delete<ResponseType>(url: string, config?: AxiosRequestConfig) {
      const response = await instance.delete<ResponseType>(url, config);
      if (axios.isAxiosError(response)) {
        throw response;
      }
      return response.data;
    },

    async head<ResponseType>(url: string, config?: AxiosRequestConfig) {
      const response = await instance.head<ResponseType>(url, config);
      if (axios.isAxiosError(response)) {
        throw response;
      }
      return response.data;
    },

    async post<RequestType, ResponseType>(
      url: string,
      data: RequestType,
      config?: AxiosRequestConfig
    ) {
      const response = await instance.post<ResponseType>(url, data, config);
      if (axios.isAxiosError(response)) {
        throw response;
      }
      return response.data;
    },

    async put<RequestType, ResponseType>(
      url: string,
      data: RequestType,
      config?: AxiosRequestConfig
    ) {
      const response = await instance.put<ResponseType>(url, data, config);
      if (axios.isAxiosError(response)) {
        throw response;
      }
      return response.data;
    },

    async patch<RequestType, ResponseType>(
      url: string,
      data: RequestType,
      config?: AxiosRequestConfig
    ) {
      const response = await instance.patch<ResponseType>(url, data, config);
      if (axios.isAxiosError(response)) {
        throw response;
      }
      return response.data;
    },
  };
}

const wrappedAuth = wrapInstance(authorisedRequester);

export { wrappedAuth as authorisedRequest };
