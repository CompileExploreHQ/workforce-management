import { SnackbarProvider } from "notistack";
import * as React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { StylesProvider } from "@mui/styles";
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export const AppProviders: React.FC<Props> = ({ children }) => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <StylesProvider injectFirst>
        <Helmet
          titleTemplate="%s - Workforce Management"
          defaultTitle="Workforce Management"
        />

        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <AuthProvider>{children}</AuthProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </StylesProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </HelmetProvider>
);
