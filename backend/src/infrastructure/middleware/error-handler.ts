import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { LoggerService } from "../../config/plugis/logger";

const logger = new LoggerService();

export const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();

  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  let message = err instanceof CustomError ? err.message : "Internal server error";

  if (statusCode === 500) {
    logger.warn(`[${timestamp}] Internal Error: ${(err as Error).stack}`);
    message = "Ocurrió un error. Contacta al administrador del sistema.";
  } else {
    logger.error(`[${timestamp}] Error: ${(err as Error).stack || message}`);
  }

  res.status(statusCode).json({
    status: statusCode,
    message,
    error: err instanceof CustomError ? err.name : (err as Error).name || "UnknownError",
    timestamp,
  });

};
