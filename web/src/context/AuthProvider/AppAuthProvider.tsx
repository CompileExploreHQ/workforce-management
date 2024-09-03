import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router-dom";

export interface AppAuthContextProps {
  authorized?: boolean;
  setAuthorized?: React.Dispatch<React.SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<void>;
  logout: (options?: { returnTo: string }) => void;
  getToken: () => string;
}

export const AppAuthContext = React.createContext<
  AppAuthContextProps | undefined
>(undefined);

interface Props {
  children: React.ReactNode;
}

export const AppAuthProvider: React.FC<Props> = ({ children }) => {
  const { replace } = useHistory();
  const [authorized, setAuthorized] = React.useState(false);

  const login = React.useCallback(
    async (email: string, password: string) => {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        setAuthorized(true);
        replace("/");
      }
    },
    [replace]
  );

  const logout = React.useCallback(() => {
    localStorage.removeItem("token");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }, []);

  const getToken = React.useCallback(() => {
    const token = localStorage.getItem("token");
    return token as string;
  }, []);

  React.useEffect(() => {
    if (authorized) {
      return;
    }

    const token = getToken();

    setAuthorized?.(token ? true : false);
    replace("/");
  }, [authorized, getToken, replace]);

  return (
    <AppAuthContext.Provider
      value={{ authorized, setAuthorized, login, logout, getToken }}
    >
      {children}
    </AppAuthContext.Provider>
  );
};
