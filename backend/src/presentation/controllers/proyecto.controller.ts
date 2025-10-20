import { NextFunction, Request, Response } from "express";
import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { CrearProyectoDto } from "../../domain/dtos/create-project.dto";
import { ActualizarProyectoDto } from "../../domain/dtos/update-project.dto";
import { CrearProyecto } from "../../domain/use-cases/CrearProyecto.usecase";
import { ActualizarProyecto } from "../../domain/use-cases/ActualizarProyecto.usecase";
import { EliminarProyecto } from "../../domain/use-cases/EliminarProyecto.usecase";
import { ObtenerProyectos } from "../../domain/use-cases/ObtenerProyectos.usecase";
import { ObtenerProyecto } from "../../domain/use-cases/ObtenerProyecto.usecase";
import { AISummaryService } from "../../domain/services/ai-summary.service";
import { AnalizarProyectosUseCase } from "../../domain/use-cases/AnalizarProyectos.usecase";
import { CantidadProyectoPorEstado } from "../../domain/use-cases/CantidadProyectoPorEstado";
import { CustomError } from "../../domain/errors/custom.error";

export class ProyectoController {
  constructor(
    private readonly proyectoRepository: ProyectoRepositoryImpl,
    private readonly aiSummarizeService: AISummaryService
  ) {}

  public obtenerProyectos = async (req: Request, res: Response, next:NextFunction) => {
    const proyectos = await new ObtenerProyectos(this.proyectoRepository).ejecutar();
    res.json(proyectos);
  };

  public obtenerProyectoPorId = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const proyecto = await new ObtenerProyecto(this.proyectoRepository).ejecutar(id);
    res.json(proyecto);
  };

  public crearProyecto = async (req: Request, res: Response) => {
    const [error, dto] = CrearProyectoDto.crear(req.body);
    if (error) throw CustomError.badRequest(error);

    const proyecto = await new CrearProyecto(this.proyectoRepository).ejecutar(dto!);
    res.status(201).json(proyecto);
  };

  public actualizarProyecto = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, dto] = ActualizarProyectoDto.crear({ ...req.body, id });
    if (error) throw CustomError.badRequest(error);

    const proyecto = await new ActualizarProyecto(this.proyectoRepository).ejecutar(dto!);
    res.json(proyecto);
  };

  public eliminarProyecto = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const result = await new EliminarProyecto(this.proyectoRepository).ejecutar(id);
    res.json(result);
  };

  public analizar = async (req: Request, res: Response) => {
    const resumen = await new AnalizarProyectosUseCase(this.proyectoRepository, this.aiSummarizeService).ejecutar();
    res.json({ resumen });
  };

  public cantidadProyectoPorEstado = async (req: Request, res: Response) => {
    const result = await new CantidadProyectoPorEstado(this.proyectoRepository).ejecutar();
    res.json(result);
  };
}
