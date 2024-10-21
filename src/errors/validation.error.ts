import { BaseError } from "./base.errors";

export class ValidationError extends BaseError {
  private field = "";
  constructor(message: string, field: string) {
    super(message, 422);
    this.field = field;
  }
}
