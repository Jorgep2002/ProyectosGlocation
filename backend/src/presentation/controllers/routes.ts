import { Router } from "express";
import { DatasourceProyecto } from "../../domain/datasource/proyecto.datasource";
import { PostgresProyectoFuenteDatos } from "../../infrastructure/datasource/Postgres-Project.Datasource";
import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { ProyectoController } from "./proyecto.controller";
import { GoogleAISummaryService } from "../../infrastructure/datasource/ai-summary-implementation.service";
import { envs } from "../../config/plugis/envs.plugin";
import { asyncErrorHandler } from "../../infrastructure/middleware/async-error-handler";

export class ProyectoRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource: DatasourceProyecto = new PostgresProyectoFuenteDatos();
        const repository: ProyectoRepositoryImpl = new ProyectoRepositoryImpl(datasource);
        const aiSummaryService = new GoogleAISummaryService(envs.GOOGLE_API_KEY);

        const controller = new ProyectoController(repository, aiSummaryService);

        router.get('/', asyncErrorHandler(controller.obtenerProyectos));
        router.get('/analisis', asyncErrorHandler(controller.analizar));
        router.get('/graficos', asyncErrorHandler(controller.cantidadProyectoPorEstado));
        router.get('/:id', asyncErrorHandler(controller.obtenerProyectoPorId));
        router.post('/', asyncErrorHandler(controller.crearProyecto));
        router.put('/:id', asyncErrorHandler(controller.actualizarProyecto));
        router.delete('/:id', asyncErrorHandler(controller.eliminarProyecto));

        return router;
    }
}
