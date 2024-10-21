import axios, { isAxiosError } from "axios";
import api from "../api";
import { BusinessError } from "../errors/business.error";
import { InternalError } from "../errors/internal.error";
import { CreateUserRequestDto } from "../dtos/location/create.user.request.dto";

export async function createUser({
  email,
  name,
  password,
}: CreateUserRequestDto) {
  try {
    const response = await api.post("/users", {
      name,
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
