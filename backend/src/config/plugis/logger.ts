import { createLogger, format, transports, Logger } from 'winston';
import path from 'path';

export class LoggerService {
  private logger: Logger;

  constructor() {
    const logFormat = format.printf(
      ({ timestamp, level, message, stack }) =>
        `${timestamp} [${level.toUpperCase()}]: ${stack || message}`
    );

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: 'proyectos-service' },
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), logFormat),
        }),
        new transports.File({
          filename: path.join('logs', 'error.log'),
          level: 'error',
        }),
        new transports.File({
          filename: path.join('logs', 'combined.log'),
        }),
      ],
    });
  }

  info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta);
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta);
  }
}
