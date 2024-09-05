import * as React from "react";
import { AccessZones } from "../../../../common/AccessZones";
import { Box, Stack } from "@mui/material";
import { uid } from "react-uid";
import { NavigationItem, NavigationItemProps } from "./components/Item";

export const navigationWidth = 240;

export interface NavigationFooterProps {
  component: () => void;
  accessZone?: AccessZones;
  accessZones?: AccessZones[];
}

export interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: NavigationItemProps[];
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <Box
      p={1.5}
      height="100%"
      width={navigationWidth}
      bgcolor="white"
      boxShadow="4"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      style={{ overflowY: "auto" }}
    >
      <Box display="flex" flexDirection="column">
        {items && (
          <Stack mt={1} spacing={1}>
            {items.map((item, id) => (
              <NavigationItem key={uid(item, id)} {...item} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
