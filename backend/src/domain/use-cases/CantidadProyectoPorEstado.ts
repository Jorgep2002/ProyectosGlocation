import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";

export interface ProyectoEstadoDto {
    estado: string;
    cantidad: number;
}

export interface CantidadProyectoPorEstadoUseCase {
    ejecutar(): Promise<ProyectoEstadoDto[]>;
}

export class CantidadProyectoPorEstado implements CantidadProyectoPorEstadoUseCase {
    constructor(private readonly repository: ProyectoRepositoryImpl) {}

    ejecutar(): Promise<ProyectoEstadoDto[]> {
        return this.repository.contarPorEstado(); 
    }
}
