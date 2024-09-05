import * as React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { DefaultWorkspaceError } from "./components/DefaultWorkspaceError";
import {
  Navigation,
  NavigationProps,
  navigationWidth,
} from "./components/Navigation";
import { Box, Fade } from "@mui/material";
import { headerHeight } from "../Layout/Header";

export interface WorkspaceProps {
  navigation?: Omit<NavigationProps, "isOpen" | "onClose">;
  errorComponent?: React.ComponentType<FallbackProps>;
  children: React.ReactNode;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  navigation,
  children,
  errorComponent = DefaultWorkspaceError,
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={errorComponent}
      onError={(error, info) => {
        console.error("******");
        console.error(error);
        console.error("******");
        console.error(info);
        console.error("******");
      }}
    >
      <Fade in>
        <Box
          display="flex"
          flexDirection="row"
          height="100%"
          maxHeight={`calc(100vh - ${headerHeight}px)`}
        >
          {navigation && (
            <Box
              flex="0 0 auto"
              width={navigationWidth}
              maxWidth={navigationWidth}
              zIndex={0}
            >
              <Navigation {...navigation} />
            </Box>
          )}

          <Box p={3} flex="1 1 auto" width="100%" style={{ overflowY: "auto" }}>
            {children}
          </Box>
        </Box>
      </Fade>
    </ErrorBoundary>
  );
};
