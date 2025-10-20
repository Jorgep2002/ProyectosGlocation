export class CustomError extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string,
    name?: string
  ) {
    super(message);
    this.name = name || "CustomError"; 
  }

  static badRequest(message: string) {
    return new CustomError(400, message, "BadRequest");
  }

  static unAuthorized(message: string) {
    return new CustomError(401, message, "Unauthorized");
  }

  static forbidden(message: string) {
    return new CustomError(403, message, "Forbidden");
  }

  static notFound(message: string) {
    return new CustomError(404, message, "NotFound");
  }

  static internalServer(message: string) {
    return new CustomError(500, message, "InternalServerError");
  }

  static businessError(message: string) {
    return new CustomError(400, message, "BusinessError");
  }
}
