import { BaseError } from "./base.errors";

export class InternalError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}
