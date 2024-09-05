import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Item = styled(NavLink)`
  padding: ${(p) => p.theme.spacing(2, 1.5)};
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  position: relative;

  &.active {
    color: ${(p) => p.theme.palette.primary.main};
    font-weight: 600;

    &::after {
      content: "";
      height: 2px;
      background-color: ${(p) => p.theme.palette.primary.main};
      position: absolute;
      bottom: 0;
      left: ${(p) => p.theme.spacing(1.5)}px;
      right: ${(p) => p.theme.spacing(1.5)}px;
    }
  }
`;

export interface NavItemProps {
  to: string;
  label: string;
}

export const NavItem: React.FC<NavItemProps> = ({ to, label }) => (
  <Item to={to}>{label}</Item>
);
