import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Alert, AlertTitle, Box, Button } from "@mui/material";

const StyledAlertTitle = styled(AlertTitle)`
  font-weight: 600;
`;

const NotFoundPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <Box
        p={2}
        width="30vw"
        minWidth="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Alert severity="info">
          <StyledAlertTitle>Oops!</StyledAlertTitle>
          <Box>The page you were looking for does not exist</Box>
          <Box mt={1}>
            <Button component={Link} {...{ to: "/" }} variant="outlined">
              Go home
            </Button>
          </Box>
        </Alert>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
