import { Alert, AlertProps, AlertTitle, Box } from "@mui/material";
import * as React from "react";
import styled from "styled-components";

const StyledAlertTitle = styled(AlertTitle)`
  font-weight: 600;
`;

export interface FullPageErrorProps {
  error?: any;
  severity?: AlertProps["severity"];
  title?: React.ReactNode;
  message?: React.ReactNode;
  actions?: React.ReactNode;
}

export const FullPageError: React.FC<FullPageErrorProps> = ({
  error,
  severity = "error",
  title,
  message,
  actions,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps, no-console
  React.useEffect(() => (error ? console.error(error) : undefined), []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
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
  );
};
