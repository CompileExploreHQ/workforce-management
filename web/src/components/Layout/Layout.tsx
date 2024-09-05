import * as React from "react";
import { Box } from "@mui/material";
import { Header, headerHeight } from "./Header";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <Box height="100vh" display="flex" flexDirection="column">
    <Header />
    <Box
      component="main"
      height={`calc(${headerHeight} - 100vh)`}
      flex="1 1 auto"
    >
      {children}
    </Box>
  </Box>
);
