import * as React from "react";
import { Link } from "react-router-dom";
import { NavItem } from "./components/NavItem";
import { useAccessZones } from "../../../hooks/useAccessZones";
import { Box, BoxProps, IconButton } from "@mui/material";
import { AccessZones } from "../../../common/AccessZones";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../../context/AuthProvider";

const i18n = {
  i18nItemDashboard: "Dashboard",
  i18nItemProfile: "Profile",
  i18nItemGlobalAdmin: "Global Admin",
  i18nItemWorkspace: "Workspace",
};

export const headerHeight = 56;

const headerProps: BoxProps = {
  height: headerHeight,
  bgcolor: "white",
  boxShadow: "4",
  display: "flex",
  flexDirection: "row",
  zIndex: 1,
};

export const Header: React.FC = () => {
  const { logout } = useAuth();
  const { hasZone, hasAllOfZones } = useAccessZones();

  return (
    <Box {...headerProps}>
      <Box
        px={3}
        display="flex"
        flexDirection="row"
        alignItems="center"
        flex="1 1 auto"
      >
        <NavItem to="/dashboard" label={i18n.i18nItemDashboard} />

        {hasZone(AccessZones.UserRead) && (
          <NavItem to="/profile" label={i18n.i18nItemProfile} />
        )}

        {hasZone(AccessZones.WorkspaceRead) && (
          <NavItem to="/workspace" label={i18n.i18nItemWorkspace} />
        )}

        {hasAllOfZones([
          AccessZones.WorkspaceCreate,
          AccessZones.WorkspaceEdit,
          AccessZones.WorkspaceRead,
        ]) && <NavItem to="/admin" label={i18n.i18nItemGlobalAdmin} />}

        <Box flex="1 1 auto" />

        <IconButton
          onClick={() => {
            logout();
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
