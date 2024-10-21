import { useEffect, useState } from "react";
import { useMapLocation } from "../useMapLocation";
import { LocationObject } from "expo-location";
import { useNearbySellers } from "../useNearbySellers";

export function useDashboardViewModel() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const { loadData, nearbySellers } = useNearbySellers();

  const { requestLocationPermission } = useMapLocation();

  async function getMyLocationToSearchNearbySellers() {
    const currentPosition = await requestLocationPermission();
    if (currentPosition) {
      setLocation(currentPosition);
      loadData(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );
    }
  }

  useEffect(() => {
    getMyLocationToSearchNearbySellers();
  }, []);

  return {
    location,
    nearbySellers,
  };
}
