import axios, { isAxiosError } from "axios";
import api from "../api";
import { BusinessError } from "../errors/business.error";
import { InternalError } from "../errors/internal.error";
import { AddNewNotificationDto } from "../dtos/add.notification.token.dto";

export async function addNewNotificationService({
  id,
  token,
}: AddNewNotificationDto) {
  try {
    if (!token) {
      throw new InternalError("Token not found in AddNewNotification");
    }

    const response = await api.post("/users/token/notification", {
      id,
      token,
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
