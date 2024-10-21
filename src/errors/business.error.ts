import { BaseError } from "./base.errors";

export class BusinessError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}
