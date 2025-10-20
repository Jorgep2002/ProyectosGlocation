import { NextFunction, Router , Request, Response} from "express";
import { ProyectoRoutes } from "./controllers/routes";
import { CustomError } from "../domain/errors/custom.error";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/proyectos', ProyectoRoutes.routes);
        router.use((req: Request, _res: Response, next: NextFunction) => {
          next(CustomError.notFound(`Route ${req.originalUrl} not found`));
         });

        return router;
    }

}
