import * as React from "react";
import { Box } from "@mui/material";

export const headerHeight = 56;

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <Box height="100vh" display="flex" flexDirection="column">
    {/* <Header /> */}
    <Box
      component="main"
      height={`calc(${headerHeight} - 100vh)`}
      flex="1 1 auto"
    >
      {children}
    </Box>
  </Box>
);
