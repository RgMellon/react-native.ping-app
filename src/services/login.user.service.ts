import axios from "axios";
import api from "../api";
import { BusinessError } from "../errors/business.error";
import { InternalError } from "../errors/internal.error";
import { LoginUserRequestDto } from "../dtos/location/login.user.request.dto";

export async function loginUserService({
  email,
  password,
}: LoginUserRequestDto) {
  try {
    const response = await api.post("/users/session", {
      email,
      password,
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
