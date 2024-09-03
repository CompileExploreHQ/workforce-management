import { AxiosError, AxiosRequestConfig } from "axios";
import * as React from "react";
import { FullPageLoading } from "../../components/FullPageLoading";
import {
  authorisedRequest,
  authorisedRequester,
} from "../../requests/requester";
import { useAuth } from "../AuthProvider";

interface ApiClientContextProps {
  client: () => typeof authorisedRequest;
}

const ApiClientContext = React.createContext<ApiClientContextProps | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

export const ApiClientProvider: React.FC<Props> = ({ children }) => {
  const { getToken, logout } = useAuth();

  const [isAxiosReady, setIsAxiosReady] = React.useState(false);

  const reqAddToken = React.useCallback(
    async (config: AxiosRequestConfig) => {
      const token = await getToken();

      if (!token) {
        logout({ returnTo: window.location.origin });
        return config;
      }

      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    },
    [getToken, logout]
  );

  const resLogoutOnAuthError = React.useCallback(
    async (err: AxiosError) => {
      if (err.response && err.response.status === 401) {
        logout({ returnTo: window.location.origin });
      }

      throw err;
    },
    [logout]
  );

  React.useEffect(() => {
    const reqInterceptorIds: number[] = [];
    const resInterceptorIds: number[] = [];

    // request interceptors
    reqInterceptorIds.push(
      authorisedRequester.interceptors.request.use(reqAddToken as any)
    );

    // response interceptors
    resInterceptorIds.push(
      authorisedRequester.interceptors.response.use(
        undefined,
        resLogoutOnAuthError
      )
    );

    setIsAxiosReady(true);

    return () => {
      reqInterceptorIds.forEach((id) =>
        authorisedRequester.interceptors.request.eject(id)
      );
      resInterceptorIds.forEach((id) =>
        authorisedRequester.interceptors.response.eject(id)
      );
    };
  }, [reqAddToken, resLogoutOnAuthError]);

  const client = React.useCallback(() => authorisedRequest, []);

  if (!isAxiosReady) {
    return <FullPageLoading />;
  }

  return (
    <ApiClientContext.Provider value={{ client }}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = React.useContext(ApiClientContext);

  if (!context) {
    throw new Error(`useApiClient must be called inside a ApiClientProvider`);
  }

  return context;
};
