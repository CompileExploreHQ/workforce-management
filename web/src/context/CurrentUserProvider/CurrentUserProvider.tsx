import * as React from "react";
import { useQuery } from "react-query";
import { FullPageError } from "../../components/FullPageError";
import { FullPageLoading } from "../../components/FullPageLoading";
import { useAuth } from "../AuthProvider";
import { Button } from "@mui/material";
import { getUsersUser, GetUsersUserResponse } from "../../api";

const i18n = {
  i18nErrorTitle: "Unable to retrieve user profile",
  i18nErrorMessage: `Please click the button below to try again.`,
  i18nErrorSignOut: "Sign Out",
};

export interface CurrentUserContextProps extends GetUsersUserResponse {
  refetch: () => void;
}

export const CurrentUserContext = React.createContext<
  CurrentUserContextProps | undefined
>(undefined);

interface Props {
  children: React.ReactNode;
}

export const CurrentUserProvider: React.FC<Props> = ({ children }) => {
  const { logout } = useAuth();

  const { isLoading, error, data, refetch } = useQuery(
    ["getUsersUser", { userId: "me" }],
    async () => getUsersUser({ userId: "me" })
  );

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (error || !data) {
    return (
      <FullPageError
        error={error}
        title={i18n.i18nErrorTitle}
        message={i18n.i18nErrorMessage}
        actions={
          <Button variant="outlined" size="small" onClick={() => logout()}>
            {i18n.i18nErrorSignOut}
          </Button>
        }
      />
    );
  }

  return (
    <CurrentUserContext.Provider
      value={{
        ...data,
        refetch,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = React.useContext(CurrentUserContext);

  if (!context) {
    throw new Error(
      `useCurrentUser must be called within a CurrentUserProvider`
    );
  }

  return context;
};
