import { EstadoProyecto } from "../entities/proyecto.entity";

export class CrearProyectoDto {
  private constructor(
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly estado: EstadoProyecto,
    public readonly fechaInicio: Date,
    public readonly fechaFin: Date
  ) {}

  static crear(props: { [key: string]: any }): [string?, CrearProyectoDto?] {
    const { nombre, descripcion, estado, fechaInicio, fechaFin } = props;

    if (!nombre) return ["El nombre del proyecto es obligatorio"];
    if (!descripcion) return ["La descripción del proyecto es obligatoria"];
    if (!estado) return ["El estado del proyecto es obligatorio"];
    if (!fechaInicio) return ["La fecha de inicio es obligatoria"];
    if (!fechaFin) return ["La fecha de fin es obligatoria"];

    if (!Object.values(EstadoProyecto).includes(estado)) {
      return ["El estado del proyecto no es válido"];
    }

    const fechaInicioParseada = new Date(fechaInicio);
    if (isNaN(fechaInicioParseada.getTime())) {
      return ["La fecha de inicio no es válida"];
    }

    const fechaFinParseada = new Date(fechaFin);
    if (isNaN(fechaFinParseada.getTime())) {
      return ["La fecha de fin no es válida"];
    }

    if (fechaFinParseada < fechaInicioParseada) {
      return ["La fecha de fin debe ser posterior a la fecha de inicio"];
    }

    return [
      undefined,
      new CrearProyectoDto(
        nombre.trim(),
        descripcion.trim(),
        estado,
        fechaInicioParseada,
        fechaFinParseada
      ),
    ];
  }
}
