import { CrearProyectoDto } from "../dtos/create-project.dto";
import { ActualizarProyectoDto } from "../dtos/update-project.dto";
import { EntidadProyecto } from "../entities/proyecto.entity";

export abstract class RepositorioProyecto {
  
  abstract crear(crearProyectoDto: CrearProyectoDto): Promise<EntidadProyecto>;

  abstract obtenerProyectos(): Promise<EntidadProyecto[]>;

  abstract buscarPorId(id: number): Promise<EntidadProyecto>;

  abstract actualizarPorId(actualizarProyectoDto: ActualizarProyectoDto): Promise<EntidadProyecto>;

  abstract eliminarPorId(id: number): Promise<EntidadProyecto>;

  abstract contarPorEstado(): Promise<{ estado: string; cantidad: number }[]>;

}
