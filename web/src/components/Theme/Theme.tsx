import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import deepmerge from "deepmerge";
import * as React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const defaultTheme: ThemeOptions = {
  palette: {
    background: {
      default: "#f7f7f7",
    },
    primary: {
      main: "#133459",
    },
    error: {
      main: "#CF2828",
    },
    success: {
      main: "#3A9F11",
    },
    warning: {
      main: "#E0CA03",
    },
    text: {
      secondary: "rgba(0,0,0,0.65)",
    },
  },
  typography: {
    fontFamily: `"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`,
  },
};

export interface ThemeProps {
  theme?: Partial<ThemeOptions>;
  baseline?: boolean;
  children: React.ReactNode;
}

export const Theme: React.FC<ThemeProps> = ({
  theme = {},
  baseline = false,
  children,
}) => {
  const system = React.useMemo(
    () => createTheme(deepmerge(defaultTheme, theme)),
    [theme]
  );

  return (
    <ThemeProvider theme={system}>
      <StyledThemeProvider theme={system}>
        {baseline && <CssBaseline />}
        <>{children}</>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};
