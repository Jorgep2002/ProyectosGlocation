import { PrismaClient, Estado } from "@prisma/client";
import { EntidadProyecto, EstadoProyecto } from "../../domain/entities/proyecto.entity";
import { DatasourceProyecto } from "../../domain/datasource/proyecto.datasource";
import { CrearProyectoDto } from "../../domain/dtos/create-project.dto";
import { ActualizarProyectoDto } from "../../domain/dtos/update-project.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class PostgresProyectoFuenteDatos implements DatasourceProyecto {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async crear(crearProyectoDto: CrearProyectoDto): Promise<EntidadProyecto> {
    try {
      const entidad = new EntidadProyecto({
        nombre: crearProyectoDto.nombre,
        descripcion: crearProyectoDto.descripcion,
        fechaInicio: crearProyectoDto.fechaInicio,
        fechaFin: crearProyectoDto.fechaFin,
        estado: crearProyectoDto.estado,
      });

      const proyecto = await this.prisma.proyecto.create({
        data: {
          nombre: entidad.nombre,
          descripcion: entidad.descripcion,
          fechaInicio: entidad.fechaInicio,
          fechaFin: entidad.fechaFin,
          estado: entidad.estado as Estado,
        },
      });

      return EntidadProyecto.desdeObjeto(proyecto);

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Error creando proyecto en la base de datos.");
    }
  }

  async obtenerProyectos(): Promise<EntidadProyecto[]> {
    try {
      const proyectos = await this.prisma.proyecto.findMany();
      return proyectos.map(EntidadProyecto.desdeObjeto);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Error obteniendo proyectos.");
    }
  }

  async buscarPorId(id: number): Promise<EntidadProyecto> {
    try {
      const proyecto = await this.prisma.proyecto.findUnique({ where: { id } });
      if (!proyecto) throw CustomError.notFound(`Proyecto con id ${id} no encontrado`);
      return EntidadProyecto.desdeObjeto(proyecto);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Error buscando proyecto.");
    }
  }

 async actualizarPorId(actualizarProyectoDto: ActualizarProyectoDto): Promise<EntidadProyecto> {
  try {
    const proyectoExistente = await this.prisma.proyecto.findUnique({
      where: { id: actualizarProyectoDto.id },
    });

    if (!proyectoExistente)
      throw CustomError.notFound(`Proyecto con id ${actualizarProyectoDto.id} no encontrado`);

    
    const entidad = new EntidadProyecto({
      ...proyectoExistente,
      ...actualizarProyectoDto.valores,
      estado: proyectoExistente.estado as unknown as EstadoProyecto, 
    });

    const proyecto = await this.prisma.proyecto.update({
      where: { id: actualizarProyectoDto.id },
      data: {
        nombre: entidad.nombre,
        descripcion: entidad.descripcion,
        estado: entidad.estado as unknown as Estado, 
        fechaInicio: entidad.fechaInicio,
        fechaFin: entidad.fechaFin,
      },
    });

    return EntidadProyecto.desdeObjeto(proyecto);
  } catch (error) {
    if (error instanceof CustomError) throw error;
    throw CustomError.internalServer("Error actualizando proyecto.");
  }
}


  async eliminarPorId(id: number): Promise<EntidadProyecto> {
    try {
      const proyecto = await this.prisma.proyecto.delete({ where: { id } });
      return EntidadProyecto.desdeObjeto(proyecto);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Error eliminando proyecto.");
    }
  }

  // ✅ Agrupar por estado
  async contarPorEstado(): Promise<{ estado: string; cantidad: number }[]> {
    try {
      const result = await this.prisma.proyecto.groupBy({
        by: ["estado"],
        _count: { estado: true },
      });
      return result.map((r) => ({ estado: r.estado, cantidad: r._count.estado }));
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer("Error contando proyectos por estado.");
    }
  }
}
