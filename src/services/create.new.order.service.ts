import axios from "axios";
import api from "../api";
import { BusinessError } from "../errors/business.error";
import { InternalError } from "../errors/internal.error";
import { CreateNewOrderDto } from "../dtos/order/create.new.order";

export async function createNewOrder({
  location,
  userId,
  amount,
  description,
}: CreateNewOrderDto) {
  if (!userId) return;
  if (!location.latitude || !location.longitude) {
    throw new BusinessError("Location coordinates are required");
  }

  try {
    const response = await api.post("/order", {
      userId: userId,
      location: location,
      status: "PENDING",
      amount,
      description,
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
