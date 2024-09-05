import { FallbackProps } from "react-error-boundary";
import { WorkspaceError } from "../../WorkspaceError";
import { Button } from "@mui/material";

const i18n = {
  i18nUnknownTitle: "An unexpected error occurred",
  i18nUnknownMessage:
    "An error occurred that the application couldn't automatically recover from. If the error continues, then try logging out and logging back in.",
  i18nUnknownReload: "Reload",
};

export function DefaultWorkspaceError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <WorkspaceError
      error={error}
      severity="error"
      title={i18n.i18nUnknownTitle}
      message={i18n.i18nUnknownMessage}
      actions={
        <Button variant="outlined" size="small" onClick={resetErrorBoundary}>
          {i18n.i18nUnknownReload}
        </Button>
      }
    />
  );
}
