import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { CrearProyectoDto } from "../dtos/create-project.dto";
import { EntidadProyecto } from "../entities/proyecto.entity";

export interface CrearProyectoUseCase {
    ejecutar(dto: CrearProyectoDto): Promise<EntidadProyecto>;
}

export class CrearProyecto implements CrearProyectoUseCase {
    constructor(private readonly repository: ProyectoRepositoryImpl) {}

    ejecutar(dto: CrearProyectoDto): Promise<EntidadProyecto> {
        return this.repository.crear(dto);
    }
}
