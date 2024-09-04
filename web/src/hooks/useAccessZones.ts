import * as React from "react";
import { AccessZones } from "../common/AccessZones";
import { useCurrentUser } from "../context/CurrentUserProvider";

const BYPASS_ALL_ACCESS_ZONES = false;

export interface UseAccessZones {
  hasZone: (zone: AccessZones) => boolean;
  hasOneOfZones: (zones: AccessZones[]) => boolean;
  hasAllOfZones: (zones: AccessZones[]) => boolean;
}

export function useAccessZones(): UseAccessZones {
  const { accessZones } = useCurrentUser();

  const hasZone = React.useCallback(
    (zone: AccessZones) => {
      if (BYPASS_ALL_ACCESS_ZONES) {
        return true;
      }

      return accessZones.includes(zone);
    },
    [accessZones]
  );

  const hasOneOfZones = React.useCallback(
    (zones: AccessZones[]) => {
      if (BYPASS_ALL_ACCESS_ZONES) {
        return true;
      }

      for (let i = 0; i < zones.length; i += 1) {
        if (accessZones.includes(zones[i])) {
          return true;
        }
      }

      return false;
    },
    [accessZones]
  );

  const hasAllOfZones = React.useCallback(
    (zones: AccessZones[]) => {
      if (BYPASS_ALL_ACCESS_ZONES) {
        return true;
      }

      for (let i = 0; i < zones.length; i += 1) {
        if (!accessZones.includes(zones[i])) {
          return false;
        }
      }

      return true;
    },
    [accessZones]
  );

  return {
    hasZone,
    hasOneOfZones,
    hasAllOfZones,
  };
}
