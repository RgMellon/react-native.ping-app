import axios from "axios";
import api from "../api";
import { BusinessError } from "../errors/business.error";
import { InternalError } from "../errors/internal.error";
import { SendMyLocationDto } from "../dtos/location/send.location.request.dto";

export async function sendMyLocation({ location, userId }: SendMyLocationDto) {
  if (!userId) return;

  try {
    const response = await api.post("/notification", {
      userId: userId,
      location: location,
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
