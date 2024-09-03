import { Box, BoxProps, CircularProgress } from "@mui/material";
import * as React from "react";

export interface LoadingProps extends BoxProps {
  isCenter?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isCenter, ...rest }) => {
  if (isCenter) {
    return (
      <Box
        flex="1 1 auto"
        height="160px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...rest}
      >
        <CircularProgress variant="indeterminate" />
      </Box>
    );
  }

  return (
    <Box flex="1 1 auto" {...rest}>
      <CircularProgress variant="indeterminate" />
    </Box>
  );
};
