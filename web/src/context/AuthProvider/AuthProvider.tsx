import * as React from "react";
import { AppAuthContext, AppAuthProvider } from "./AppAuthProvider";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  return <AppAuthProvider>{children}</AppAuthProvider>;
};

export const useAuth = () => {
  const context = React.useContext(AppAuthContext);

  if (!context) {
    throw new Error("useAuth must be called within a AuthProvider");
  }

  return context;
};
