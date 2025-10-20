import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { ActualizarProyectoDto } from "../dtos/update-project.dto";
import { EntidadProyecto } from "../entities/proyecto.entity";


export interface ActualizarProyectoUseCase {
    ejecutar(dto: ActualizarProyectoDto): Promise<EntidadProyecto>;
}

export class ActualizarProyecto implements ActualizarProyectoUseCase {
    constructor(private readonly repository: ProyectoRepositoryImpl) {}

    ejecutar(dto: ActualizarProyectoDto): Promise<EntidadProyecto> {
        return this.repository.actualizarPorId(dto);
    }
}
