import { useEffect, useState } from "react";
import { useMapLocation } from "../useMapLocation";
import { LocationObject } from "expo-location";
import { useNearbySellers } from "../useNearbySellers";
import { sendMyLocation } from "@/src/services/send-my-location.service";
import { useAuth } from "../../context/auth";
import { createNewOrder } from "@/src/services/create.new.order.service";
import { CreateNewOrderDto } from "@/src/dtos/order/create.new.order";

export function useDashboardViewModel() {
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const { loadData, nearbySellers } = useNearbySellers();
  const { data } = useAuth();

  const { requestLocationPermission } = useMapLocation();

  async function getMyLocationToSearchNearbySellers() {
    const currentPosition = await requestLocationPermission();
    if (currentPosition) {
      setLocation(currentPosition);
      loadData(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );

      await sendMyLocation({
        location: {
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        },
        userId: data.user.id,
      });
    }
  }

  async function createOrder({
    amount,
    description,
  }: Omit<CreateNewOrderDto, "userId" | "location">) {
    try {
      setLoadingOrder(true);
      await createNewOrder({
        userId: data?.access_token,
        location: {
          latitude: location?.coords.latitude ?? 0,
          longitude: location?.coords.longitude ?? 0,
        },
        amount,
        description,
      });
      alert("Order created successfully!");
      setLoadingOrder(false);
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create order");
    } finally {
      setLoadingOrder(false);
    }
  }

  useEffect(() => {
    getMyLocationToSearchNearbySellers();
  }, []);

  return {
    location,
    nearbySellers,
    loadingOrder,
    createOrder,
  };
}
