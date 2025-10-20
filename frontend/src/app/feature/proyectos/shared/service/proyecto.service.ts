import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { Observable } from 'rxjs';
import { Project } from '../../../../shared/models/project.model';
import { environment } from '../../../../../environments/enviroment';

export interface ProyectoPorEstado {
  estado: string;
  cantidad: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private readonly baseUrl = `${environment.apiUrl}/api/proyectos`;

  constructor(private readonly httpService: HttpService) {}

  public obtenerProyectos(): Observable<Project[]> {
    return this.httpService.doGet<Project[]>(this.baseUrl);
  }

  public obtenerProyectoPorId(id: number): Observable<Project> {
    return this.httpService.doGet<Project>(`${this.baseUrl}/${id}`);
  }

  public crearProyecto(project: Project): Observable<Project> {
    return this.httpService.doPost<Project, Project>(this.baseUrl, project);
  }

  public actualizarProyecto(id: number, project: Project): Observable<Project> {
    return this.httpService.doPut<Project, Project>(`${this.baseUrl}/${id}`, project);
  }

  public eliminarProyecto(id: number): Observable<void> {
    return this.httpService.doDelete<void>(`${this.baseUrl}/${id}`);
  }

  public analizarProyectos(): Observable<{ resumen: any }> {
    return this.httpService.doGet<{ resumen: any }>(`${this.baseUrl}/analisis`);
  }

    public obtenerCantidadProyectosPorEstado(): Observable<ProyectoPorEstado[]> {
    return this.httpService.doGet<ProyectoPorEstado[]>(`${this.baseUrl}/graficos`);
  }
}
