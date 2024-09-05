import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AccessZones } from "../../../../../common/AccessZones";
import { useAccessZones } from "../../../../../hooks/useAccessZones";

const Item = styled(NavLink)`
  display: block;
  padding: 8px;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 15px;
  text-decoration: none;
  &.active {
    color: ${(p) => p.theme.palette.primary.main};
    background-color: ${(p) => p.theme.colorSet.paleBlue};
    font-weight: 600;
  }
`;

export interface NavigationItemProps {
  label: string;
  to: string;
  onClick?: () => void;
  accessZone?: AccessZones;
  accessZones?: AccessZones[];
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  to,
  onClick,
  accessZone,
  accessZones,
}) => {
  const { hasZone, hasOneOfZones } = useAccessZones();

  if (accessZone && !hasZone(accessZone)) {
    return null;
  }

  if (accessZones && accessZones.length && !hasOneOfZones(accessZones)) {
    return null;
  }

  return (
    <Item to={to} onClick={onClick}>
      {label}
    </Item>
  );
};
