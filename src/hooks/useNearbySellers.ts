import { useState } from "react";
import { LocationResponseDto } from "../dtos/location/location.response.dto";
import { getNearbySellers } from "../services/get-nearby-sellers";
import { BusinessError } from "../errors/business.error";

export const useNearbySellers = () => {
  const [nearbySellers, setNearbySellers] = useState<LocationResponseDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (latitude: number, longitude: number) => {
    try {
      const data = await getNearbySellers({
        latitude,
        longitude,
      });
      setNearbySellers(data);
    } catch (e) {
      setError("Error ");
      throw new BusinessError("Product not found");
    }
  };

  return { loadData, error, nearbySellers };
};
