export class BaseError extends Error {
  private statusCode: number | null = null;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
