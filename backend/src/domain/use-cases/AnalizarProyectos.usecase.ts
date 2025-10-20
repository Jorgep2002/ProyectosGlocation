import { ProyectoRepositoryImpl } from "../../infrastructure/repository/proyecto-implementantion.repository";
import { AISummaryService } from "../services/ai-summary.service";

export class AnalizarProyectosUseCase {

  constructor(
    private readonly proyectoRepository: ProyectoRepositoryImpl,
    private readonly aiSummaryService: AISummaryService
  ) {}

  async ejecutar(): Promise<string> {
    const proyectos = await this.proyectoRepository.obtenerProyectos();
  const descripciones = proyectos
    .map(p => {
      const descripcion = p.descripcion?.trim();
      if (!descripcion) return null; 
      return `Proyecto "${p.nombre}": ${descripcion}`;
    })
    .filter((d): d is string => !!d); 

    if (descripciones.length === 0) {
      return 'No hay descripciones disponibles para analizar.';
    }

    return await this.aiSummaryService.resumir(descripciones);
  }
}