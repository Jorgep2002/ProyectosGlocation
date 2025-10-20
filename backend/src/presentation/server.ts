import express, { Router } from 'express';
import { errorHandlerMiddleware } from '../infrastructure/middleware/error-handler';
import { LoggerService } from '../config/plugis/logger';
import { setupSwagger } from '../docs/swagger';


interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private readonly logger = new LoggerService();

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    try {
      //* Middlewares
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));

      //* Public Folder
      this.app.use(express.static(this.publicPath));

      //* Swagger
      setupSwagger(this.app);
      
      //* Routes
      this.app.use(this.routes);

      //* Error Handler 
      this.app.use(errorHandlerMiddleware);

      this.serverListener = this.app.listen(this.port, () => {
        const msg = `Server running on port ${this.port}`;
        this.logger.info(msg); 
      });
    } catch (err) {
      this.logger.error('Failed to start server', err);
      throw err;
    }
  }

  public close() {
    this.serverListener?.close(() => {
      this.logger.info('Server closed');
    });
  }
}
