import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { EntidadProyecto } from "../entities/proyecto.entity";


export interface ObtenerProyectosUseCase {
    ejecutar(): Promise<EntidadProyecto[]>;
}

export class ObtenerProyectos implements ObtenerProyectosUseCase {
    constructor(private readonly repository: ProyectoRepositoryImpl) {}

    ejecutar(): Promise<EntidadProyecto[]> {
        return this.repository.obtenerProyectos();
    }
}
