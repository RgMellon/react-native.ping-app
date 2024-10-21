import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useEffect } from "react";

export function useMapLocation() {
  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      return await getCurrentPositionAsync();
    }
  }

  return { requestLocationPermission };
}
