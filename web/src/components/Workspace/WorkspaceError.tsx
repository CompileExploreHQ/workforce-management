import { Alert, AlertProps, AlertTitle, Box, Fade } from "@mui/material";
import * as React from "react";
import styled from "styled-components";
import { headerHeight } from "../Layout/Header";

const StyledAlertTitle = styled(AlertTitle)`
  font-weight: 600;
`;

export interface WorkspaceErrorProps {
  error?: any;
  severity?: AlertProps["severity"];
  title?: React.ReactNode;
  message?: React.ReactNode;
  actions?: React.ReactNode;
}

export function WorkspaceError({
  error,
  severity,
  title,
  message,
  actions,
}: WorkspaceErrorProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps, no-console
  React.useEffect(() => (error ? console.error(error) : undefined), []);

  return (
    <Fade in>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        maxHeight={`calc(100vh - ${headerHeight}px)`}
      >
        <Box
          p={2}
          width="30vw"
          minWidth="300px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Alert severity={severity}>
            {title && <StyledAlertTitle>{title}</StyledAlertTitle>}
            {message && <Box>{message}</Box>}
            {actions && <Box mt={1}>{actions}</Box>}
          </Alert>
        </Box>
      </Box>
    </Fade>
  );
}
