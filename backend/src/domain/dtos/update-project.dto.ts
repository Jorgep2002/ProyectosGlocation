import { EstadoProyecto } from "../entities/proyecto.entity";

export class ActualizarProyectoDto {
  private constructor(
    public readonly id: number, 
    public readonly nombre?: string,
    public readonly descripcion?: string,
    public readonly fechaInicio?: Date,
    public readonly fechaFin?: Date | null,
    public readonly estado?: EstadoProyecto
  ) {}

  get valores() {
    const objetoRetorno: { [key: string]: any } = {};

    if (this.nombre) objetoRetorno.nombre = this.nombre;
    if (this.descripcion) objetoRetorno.descripcion = this.descripcion;
    if (this.fechaInicio) objetoRetorno.fechaInicio = this.fechaInicio;
    if (this.fechaFin) objetoRetorno.fechaFin = this.fechaFin;
    if (this.estado) objetoRetorno.estado = this.estado;

    return objetoRetorno;
  }

  static crear(props: { [key: string]: any }): [string?, ActualizarProyectoDto?] {
    const { id, nombre, descripcion, fechaInicio, fechaFin, estado } = props;

    if (id === undefined || id === null || isNaN(Number(id))) {
      return ["El ID del proyecto es obligatorio y debe ser un número"];
    }

    let fechaInicioParseada: Date | undefined;
    let fechaFinParseada: Date | null | undefined;

    if (fechaInicio) {
      fechaInicioParseada = new Date(fechaInicio);
      if (isNaN(fechaInicioParseada.getTime())) return ["Fecha de inicio inválida"];
    }

    if (fechaFin) {
      fechaFinParseada = new Date(fechaFin);
      if (isNaN(fechaFinParseada.getTime())) return ["Fecha de finalización inválida"];
    }

    return [
      undefined,
      new ActualizarProyectoDto(
        Number(id), 
        nombre,
        descripcion,
        fechaInicioParseada,
        fechaFinParseada,
        estado
      ),
    ];
  }
}
