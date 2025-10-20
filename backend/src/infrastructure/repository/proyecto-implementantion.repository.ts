import { DatasourceProyecto } from "../../domain/datasource/proyecto.datasource";
import { CrearProyectoDto } from "../../domain/dtos/create-project.dto";
import { ActualizarProyectoDto } from "../../domain/dtos/update-project.dto";
import { EntidadProyecto } from "../../domain/entities/proyecto.entity";
import { RepositorioProyecto } from "../../domain/repository/project-repository";

export class ProyectoRepositoryImpl implements RepositorioProyecto {
 

  constructor(
    private readonly proyectoDatasource: DatasourceProyecto,
  ) {}

  async crear(crearProyectoDto: CrearProyectoDto): Promise<EntidadProyecto> {
    return this.proyectoDatasource.crear(crearProyectoDto);
  }

  async obtenerProyectos(): Promise<EntidadProyecto[]> {
    return this.proyectoDatasource.obtenerProyectos();
  }

  async buscarPorId(id: number): Promise<EntidadProyecto> {
    return this.proyectoDatasource.buscarPorId(id);
  }

  async actualizarPorId(actualizarProyectoDto: ActualizarProyectoDto): Promise<EntidadProyecto> {
    return this.proyectoDatasource.actualizarPorId(actualizarProyectoDto);
  }

  async eliminarPorId(id: number): Promise<EntidadProyecto> {
    return this.proyectoDatasource.eliminarPorId(id);
  }

  async contarPorEstado(): Promise<{ estado: string; cantidad: number }[]> {
      return this.proyectoDatasource.contarPorEstado();
  }
}
