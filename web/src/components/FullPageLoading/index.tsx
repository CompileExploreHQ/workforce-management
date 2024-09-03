import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const FullPageLoading: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100vw"
  >
    <Box display="flex" flexDirection="column" justifyContent="center">
      <CircularProgress />
    </Box>
  </Box>
);
