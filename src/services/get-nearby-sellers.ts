import axios, { isAxiosError } from "axios";
import api from "../api";
import { BusinessError } from "../errors/business.error";
import { InternalError } from "../errors/internal.error";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export async function getNearbySellers({ latitude, longitude }: Coordinates) {
  try {
    const response = await api.get("/notification", {
      params: {
        latitude,
        longitude,
      },
    });

    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status !== 500) {
        throw new BusinessError(err.message);
      } else {
        throw new InternalError(err.message);
      }
    } else {
      throw new InternalError("An unexpected error occurred");
    }
  }
}
