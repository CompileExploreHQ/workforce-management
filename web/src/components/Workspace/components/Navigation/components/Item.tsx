import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { uid } from "react-uid";
import styled from "styled-components";
import { AccessZones } from "../../../../../common/AccessZones";
import { useAccessZones } from "../../../../../hooks/useAccessZones";
import { useDisclosure } from "../../../../../hooks/useDisclosure";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const Item = styled(NavLink)`
  display: block;
  padding: ${(p) => p.theme.spacing(1)}px;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 15px;
  text-decoration: none;
  &.active {
    color: ${(p) => p.theme.palette.primary.main};
    background-color: ${(p) => p.theme.palette.primary.main};
    font-weight: 600;
  }
`;

const BoxItem = styled("div")`
  display: block;
  padding: ${(p) => p.theme.spacing(1)}px;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
`;
const useStyles = makeStyles(() => ({
  subItem: {
    backgroundColor: "grey",
    marginLeft: "10px",
    marginRight: "10px",
  },
}));
const RootItemIcon = styled("div")<{ isOpen: boolean }>`
  margin-left: auto;
  display: flex;
  align-items: center;
  transform: rotate(${(p) => (p.isOpen ? 180 : 0)}deg);
`;

export interface NavigationItemProps {
  icon?: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
  accessZone?: AccessZones;
  accessZones?: AccessZones[];
  subItem?: NavigationItemProps[];
  action?: React.ReactNode;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  label,
  to,
  onClick,
  accessZone,
  accessZones,
  subItem,
  action,
}) => {
  const { pathname } = useLocation();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const classes = useStyles();
  useEffect(() => {
    if (subItem) {
      if (subItem?.some((item) => item.to === pathname)) onOpen();
      if (subItem?.every((item) => item.to !== pathname)) onClose();
    }
  }, [onClose, onOpen, pathname, subItem]);

  const { hasZone, hasOneOfZones } = useAccessZones();

  if (accessZone && !hasZone(accessZone)) {
    return null;
  }

  if (accessZones && accessZones.length && !hasOneOfZones(accessZones)) {
    return null;
  }

  if (subItem) {
    return (
      <>
        <BoxItem
          onClick={onToggle}
          style={{ display: "flex", alignItems: "center" }}
        >
          {icon && <Box>{icon}</Box>}
          {label}
          {subItem && (
            <RootItemIcon isOpen={isOpen}>
              <ArrowDropDown />
            </RootItemIcon>
          )}
        </BoxItem>
        {subItem && isOpen && (
          <Box className={classes.subItem}>
            {subItem.map((item, index) => (
              <NavigationItem key={uid(item, index)} {...item} />
            ))}
            {action}
          </Box>
        )}
      </>
    );
  }

  return (
    <Item to={to} onClick={onClick}>
      {icon && <Box>{icon}</Box>}
      {label}
    </Item>
  );
};
