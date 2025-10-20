import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { EntidadProyecto } from "../entities/proyecto.entity";


export interface EliminarProyectoUseCase {
    ejecutar(id: number): Promise<EntidadProyecto>;
}

export class EliminarProyecto implements EliminarProyectoUseCase {
    constructor(private readonly repository: ProyectoRepositoryImpl) {}

    ejecutar(id: number): Promise<EntidadProyecto> {
        return this.repository.eliminarPorId(id);
    }
}
