import { CustomError } from "../errors/custom.error";

export enum EstadoProyecto {
  EN_PROGRESO = "EN_PROGRESO",
  FINALIZADO = "FINALIZADO",
  PAUSADO = "PAUSADO",
}

export interface OpcionesEntidadProyecto {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date | null;
  estado: EstadoProyecto;
}

export class EntidadProyecto {
  public readonly id?: number;
  public readonly nombre: string;
  public readonly descripcion: string;
  public readonly fechaInicio: Date;
  public readonly fechaFin: Date | null;
  public readonly estado: EstadoProyecto;
  public readonly creadoEn: Date;
  public actualizadoEn: Date;

  constructor(opciones: OpcionesEntidadProyecto) {
    const { id, nombre, descripcion, fechaInicio, fechaFin, estado } = opciones;

    if (!nombre?.trim())
      throw CustomError.businessError("El nombre del proyecto es obligatorio");
    if (!descripcion?.trim())
      throw CustomError.businessError("La descripción del proyecto es obligatoria");
    if (!fechaInicio)
      throw CustomError.businessError("La fecha de inicio es obligatoria");
    if (fechaFin === undefined)
      throw CustomError.businessError("La fecha de fin es obligatoria");
    if (!estado)
      throw CustomError.businessError("El estado del proyecto es obligatorio");

    if (fechaFin && fechaFin < fechaInicio) {
      throw CustomError.businessError(
        "La fecha de fin no puede ser anterior a la fecha de inicio"
      );
    }

    this.id = id;
    this.nombre = nombre.trim();
    this.descripcion = descripcion.trim();
    this.fechaInicio = new Date(fechaInicio);
    this.fechaFin = fechaFin ? new Date(fechaFin) : null;
    this.estado = estado;

    const ahora = new Date();
    this.creadoEn = ahora;
    this.actualizadoEn = ahora;
  }

  static desdeObjeto(objeto: Record<string, any>): EntidadProyecto {
    const {
      id,
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      estado,
      actualizadoEn,
    } = objeto;

    const entidad = new EntidadProyecto({
      id,
      nombre,
      descripcion,
      fechaInicio: new Date(fechaInicio),
      fechaFin: fechaFin ? new Date(fechaFin) : null,
      estado,
    });

    entidad["actualizadoEn"] = actualizadoEn ? new Date(actualizadoEn) : new Date();

    return entidad;
  }

  actualizarTimestamps(): void {
    this.actualizadoEn = new Date();
  }
}
