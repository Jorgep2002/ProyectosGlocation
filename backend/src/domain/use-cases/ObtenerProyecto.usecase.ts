import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { EntidadProyecto } from "../entities/proyecto.entity";


export interface ObtenerProyectoUseCase {
    ejecutar(id: number): Promise<EntidadProyecto>;
}

export class ObtenerProyecto implements ObtenerProyectoUseCase {
    constructor(private readonly repository: ProyectoRepositoryImpl) {}

    ejecutar(id: number): Promise<EntidadProyecto> {
        return this.repository.buscarPorId(id);
    }
}
